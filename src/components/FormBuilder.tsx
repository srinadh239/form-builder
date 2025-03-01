// components/form_builder.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
  const navigate = useNavigate();
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

    navigate("/form");
    // const schema = {
    //   formTitle: "Generated Form",
    //   fields,
    // };
    // localStorage.setItem("formSchema", JSON.stringify(schema));
    // console.log("Generated Schema:", JSON.stringify(schema, null, 2));
    // showToast({ description: "Schema generated successfully!" });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Form Builder</h2>
      {fields.map((field) => (
        <Card
          key={field.id}
          headerContent={
            <>
              <h3 className="text-lg font-semibold text-black w-full">{field.label}</h3>
              {fields.length > 0 && <TrashIcon className="h-6 w-6 mx-6 text-red-600" onClick={() => removeField(field.id)} />}
              <ChevronUpIcon className="h-6 w-6 text-gray-600" />
            </>
          }
        >
          <div className="flex space-x-2 items-center">
            <Input
              type="text"
              placeholder="Question Title"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              className="w-full"
            />
            {allFieldsValid && <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />}
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-2 items-center">
            <Select
              value={field.type}
              placeholder="Question Type"
              className="mt-4 mb-4 w-full"
              onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
            </Select>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="ml-2 text-black">Required</span>
            </label>
          </div>
            {field.type === "select" && (
              <Input
                type="text"
                placeholder="Comma-separated options"
                onChange={(e) => updateField(field.id, { options: e.target.value.split(",") })}
                className="w-full"
                value={field.options?.join(",") || ""}
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
        </Card>
      ))}
      <div className="flex">
        {allFieldsValid && <Button onClick={addField} className="mr-2 bg-white flex items-center">
          <PlusIcon className="h-6 w-6 text-gray-600 height-10 sm-full" />
          Add Question
        </Button>}
        {allFieldsValid && fields.length >=1 && <Button variant="secondary" onClick={generateSchema} className="flex items-center">Generate Schema</Button>}
      </div>
      {ToastComponent}
    </div>
  );
};

// export { FormField };

export default FormBuilder;
