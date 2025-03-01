import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  options?: string[];
}

type FormSchema = {
  formTitle: string;
  fields: FormField[];
};

const FormRenderer = () => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedSchema = localStorage.getItem("formSchema");
    if (storedSchema) {
      setFormSchema(JSON.parse(storedSchema));
    }
  }, []);

  if (!formSchema) {
    return <p>Loading form...</p>;
  }

  const validateField = (field: any, value: string) => {
    if (!value.trim() && field.required) {
      return `${field.label} is required.`;
    }
    if (field.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} must be at most ${field.maxLength} characters.`;
    }
    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      return `${field.label} does not match the required pattern.`;
    }
    if (field.type === "number") {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return `${field.label} must be a number.`;
      }
      if (field.minValue !== undefined && numValue < field.minValue) {
        return `${field.label} must be at least ${field.minValue}.`;
      }
      if (field.maxValue !== undefined && numValue > field.maxValue) {
        return `${field.label} must be at most ${field.maxValue}.`;
      }
    }
    return "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    formSchema.fields.forEach((field) => {
      const value = formData[field.id] || "";
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        newErrors[field.id] = errorMessage;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    const field = formSchema?.fields.find((f) => f.id === id);
    if (field) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: validateField(field, value) }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form submitted successfully!\n" + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{formSchema.formTitle}</h2>
        <Card>
          <CardContent>
            {formSchema.fields.map((field) => (
              <>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={errors[field.id] ? "border-red-500" : ""}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={errors[field.id] ? "border-red-500" : ""}
                  />
                )}
                {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
              </>
            ))}
          </CardContent>
        </Card>
      <Button variant="primary" onClick={handleSubmit} className="mt-4">Submit</Button>
    </div>
  );
};

export default FormRenderer;