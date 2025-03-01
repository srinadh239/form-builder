// components/form_builder.tsx
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { useToast } from "./ui/use-toast";

type FieldType = "text" | "number" | "select";

type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  options?: string[];
};

type FormSchema = {
  formTitle: string;
  fields: FormField[];
};

const FormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>(() => {
    const savedSchema = localStorage.getItem("formSchema");
    return savedSchema ? JSON.parse(savedSchema).fields : [];
  });
  const { showToast, ToastComponent } = useToast();

  const allFieldsValid = fields.every(
    (field) => field.label.trim() !== "" && (!field.required || field.required === true)
  );

  useEffect(() => {
    if (allFieldsValid) {
      const schema: FormSchema = { formTitle: "Generated Form", fields };
      localStorage.setItem("formSchema", JSON.stringify(schema));
    }
  }, [fields, allFieldsValid]);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), label: "", type: "text" }]);
  };

  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updatedField } : field)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const generateSchema = () => {
    if (fields.some((field) => !field.label)) {
      showToast({ description: "All fields must have labels!", variant: "destructive" });
      return;
    }
    const schema = {
      formTitle: "Generated Form",
      fields,
    };
    localStorage.setItem("formSchema", JSON.stringify(schema));
    console.log("Generated Schema:", JSON.stringify(schema, null, 2));
    showToast({ description: "Schema generated successfully!" });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Form Builder</h2>
      {fields.map((field) => (
        <Card key={field.id}>
          <CardContent>
            <Input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
            />
            <Select
              value={field.type}
              onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
            </Select>
            {field.type === "select" && (
              <Input
                type="text"
                placeholder="Comma-separated options"
                onChange={(e) => updateField(field.id, { options: e.target.value.split(",") })}
              />
            )}
            {field.type === "text" && (
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min Length"
                  onChange={(e) => updateField(field.id, { minLength: parseInt(e.target.value) || undefined })}
                />
                <Input
                  type="number"
                  placeholder="Max Length"
                  onChange={(e) => updateField(field.id, { maxLength: parseInt(e.target.value) || undefined })}
                />
                <Input
                  type="text"
                  placeholder="Regex Pattern"
                  onChange={(e) => updateField(field.id, { pattern: e.target.value })}
                />
              </div>
            )}
            {field.type === "number" && (
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min Value"
                  onChange={(e) => updateField(field.id, { minValue: parseFloat(e.target.value) || undefined })}
                />
                <Input
                  type="number"
                  placeholder="Max Value"
                  onChange={(e) => updateField(field.id, { maxValue: parseFloat(e.target.value) || undefined })}
                />
              </div>
            )}
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => updateField(field.id, { required: e.target.checked })}
              />
              <span className="ml-2">Required</span>
            </label>
            <Button variant="secondary" onClick={() => removeField(field.id)}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      {allFieldsValid && <Button onClick={addField} className="mr-2">Add Question</Button>}
      {allFieldsValid && fields.length >=1 && <Button variant="primary" onClick={generateSchema} className="mt-4">Generate Schema</Button>}
      {ToastComponent}
    </div>
  );
};

// export { FormField };

export default FormBuilder;
