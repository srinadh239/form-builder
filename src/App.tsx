import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select } from "./components/ui/select";
import { useToast } from "./components/ui/use-toast"; // Updated import to useToast

interface FormField {
  id: number;
  label: string;
  type: "text" | "number" | "select";
  required: boolean;
  options?: string[];
  value?: string;
}

const FormBuilder = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<FormField["type"]>("text");
  const [isRequired, setIsRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast(); // Ensure useToast hook is used

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(formFields));
  }, [formFields]);

  const handleAddField = () => {
    if (!fieldLabel) {
      showToast({ description: "Field label cannot be empty", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      const newField: FormField = { id: Date.now(), label: fieldLabel, type: fieldType, required: isRequired };
      if (fieldType === "select") {
        newField.options = fieldOptions.split(",").map(opt => opt.trim());
      }
      setFormFields([...formFields, newField]);
      setFieldLabel("");
      setFieldType("text");
      setIsRequired(false);
      setFieldOptions("");
      setIsSaving(false);
      showToast({ description: "Field added successfully", variant: "success" });
    }, 500);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFieldType(e.target.value as FormField["type"]);
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Form Builder</h2>
          <Input
            placeholder="Field Label"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
          />
          <Select value={fieldType} onChange={handleTypeChange} name="Field Label">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </Select>
          {fieldType === "select" && (
            <Input
              placeholder="Comma-separated options"
              value={fieldOptions}
              onChange={(e) => setFieldOptions(e.target.value)}
            />
          )}
          <label>
            <input type="checkbox" checked={isRequired} onChange={() => setIsRequired(!isRequired)} /> Required
          </label>
          <Button onClick={handleAddField} disabled={isSaving}>
            {isSaving ? "Saving..." : "Add Field"}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Generated Form</h2>
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block font-medium">
                {field.label} {field.required && "*"}
              </label>
              {field.type === "text" || field.type === "number" ? (
                <Input type={field.type} required={field.required} />
              ) : field.type === "select" ? (
                <select required={field.required}>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormBuilder;
