import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { randomDelay } from "../utils/delay";
import { Loader } from './ui/loader';
import { useToast } from "./ui/use-toast";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  value?: string;
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
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    const storedSchema = localStorage.getItem("formSchema");

    if (storedSchema) {
      randomDelay(500, 1000).then(() => {
        setLoadingSchema(false);
        setFormSchema({...JSON.parse(storedSchema)});
      });
    }
  }, []);

  if (loadingSchema) {
    return <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>;
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
    formSchema?.fields.forEach((field) => {
      const value = formData[field.id] || "";
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        newErrors[field.id] = errorMessage;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldNames = () => {
    const newFields: Record<string, string> = {};
    formSchema?.fields.forEach((field) => {
      const value = formData[field.id] || "";
      newFields[field.label] = value;
    });
    return newFields;
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
      setLoading(true);
      randomDelay(500, 1000).then(() => {
        showToast({ description: "Form Submitted Successfully" });
        setLoading(false);
        setFormSubmitted(true);
      });
    }
  };

  return (
    <div className="p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4 p-4">
          {formSchema?.fields.map((field) => (
            <div key={field.id} className="mb-4">
              {field.type === "select" ? (
                <Select
                  value={field.value || ""}
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
                  placeholder={field.label}
                  type={field.type === "number" ? "number" : "text"}
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={errors[field.id] ? "border-red-500" : ""}
                />
              )}
              {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
            </div>
          ))}
        </div>
      {formSubmitted ? <div>
          <label 
            className={`absolute left-3 text-black text-sm`} 
          >
            {JSON.stringify(getFieldNames(), null, 2)}
          </label>
        </div> : <Button variant="secondary" onClick={handleSubmit} className="mt-4 bg-w flex items-center">
        {loading && <ArrowPathIcon className="h-6 w-6 mx-6 text-gray-600" />}
        Submit
      </Button>}
      {ToastComponent}
    </div>
  );
};

export default FormRenderer;