import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { randomDelay } from "../utils/delay";
import { Loader } from './ui/loader';
import { useToast } from "./ui/use-toast";
const FormRenderer = () => {
    const [loadingSchema, setLoadingSchema] = useState(true);
    const [formSchema, setFormSchema] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { showToast, ToastComponent } = useToast();
    useEffect(() => {
        const storedSchema = localStorage.getItem("formSchema");
        if (storedSchema) {
            randomDelay(500, 1000).then(() => {
                setLoadingSchema(false);
                setFormSchema({ ...JSON.parse(storedSchema) });
            });
        }
    }, []);
    if (loadingSchema) {
        return _jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx(Loader, {}) });
    }
    const validateField = (field, value) => {
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
        const newErrors = {};
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
        const newFields = {};
        formSchema?.fields.forEach((field) => {
            const value = formData[field.id] || "";
            newFields[field.label] = value;
        });
        return newFields;
    };
    const handleChange = (id, value) => {
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
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-4 p-4", children: formSchema?.fields.map((field) => (_jsxs("div", { className: "mb-4", children: [field.type === "select" ? (_jsxs(Select, { value: field.value || "", onChange: (e) => handleChange(field.id, e.target.value), className: errors[field.id] ? "border-red-500" : "", children: [_jsx("option", { value: "", children: "Select an option" }), field.options?.map((option) => (_jsx("option", { value: option, children: option }, option)))] })) : (_jsx(Input, { placeholder: field.label, type: field.type === "number" ? "number" : "text", value: field.value, onChange: (e) => handleChange(field.id, e.target.value), className: errors[field.id] ? "border-red-500" : "" })), errors[field.id] && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors[field.id] })] }, field.id))) }), formSubmitted ? _jsx("div", { children: _jsx("label", { className: `absolute left-3 text-black text-sm`, children: JSON.stringify(getFieldNames(), null, 2) }) }) : _jsxs(Button, { variant: "secondary", onClick: handleSubmit, className: "mt-4 bg-w flex items-center", children: [loading && _jsx(ArrowPathIcon, { className: "h-6 w-6 mx-6 text-gray-600" }), "Submit"] }), ToastComponent] }));
};
export default FormRenderer;
