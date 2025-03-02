import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// components/form_builder.tsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { ArrowPathIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import { Accordion } from "./ui/accordion";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { useToast } from "./ui/use-toast";
import { randomDelay } from "../utils/delay";
import { Loader } from './ui/loader';
const FormBuilder = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [loadingSchema, setLoadingSchema] = useState(true);
    const [addingQuestion, setAddingQuestion] = useState(false);
    const [loading, setLoading] = useState({});
    const [fields, setFields] = useState([]);
    const { showToast, ToastComponent } = useToast();
    const allFieldsValid = fields.every((field) => field.label.trim() !== "" && (!field.required || field.required === true));
    useEffect(() => {
        const storedSchema = localStorage.getItem("formSchema");
        if (storedSchema) {
            randomDelay(500, 1000).then(() => {
                setLoadingSchema(false);
                setFields(JSON.parse(storedSchema).fields || []);
            });
        }
    }, []);
    useEffect(() => {
        if (allFieldsValid && !loadingSchema) {
            const schema = { formTitle: "Generated Form", fields };
            localStorage.setItem("formSchema", JSON.stringify(schema));
        }
    }, [fields, allFieldsValid, loadingSchema]);
    const addField = async () => {
        setAddingQuestion(true);
        randomDelay(500, 1000).then(() => {
            setAddingQuestion(false);
            setFields([...fields, { id: Date.now().toString(), label: "", type: "text" }]);
            setOpenIndex(fields.length);
        });
    };
    const updateField = (id, updatedField) => {
        setLoading({ [id]: true });
        randomDelay(50, 100).then(() => {
            setLoading({ [id]: false });
            setFields(fields.map((field) => (field.id === id ? { ...field, ...updatedField } : field)));
        });
    };
    const removeField = async (id) => {
        setLoading({ [id]: true });
        randomDelay(500, 1000).then(() => {
            setLoading({ [id]: false });
            setFields(fields.filter((field) => field.id !== id));
        });
    };
    const generateSchema = () => {
        if (fields.some((field) => !field.label)) {
            showToast({ description: "All fields must have labels!", variant: "destructive" });
            return;
        }
    };
    if (loadingSchema) {
        return _jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx(Loader, {}) });
    }
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-black", children: "Form Builder" }), fields.map((field, index) => (_jsxs(Accordion, { headerContent: _jsxs(_Fragment, { children: [_jsx("h3", { className: "text-lg font-semibold text-black w-full", children: field.label }), loading[field.id] ?
                            _jsx(ArrowPathIcon, { className: "h-6 w-6 mx-6 text-gray-600" })
                            : _jsx(TrashIcon, { className: "h-6 w-6 mx-6 text-red-600", onClick: (e) => {
                                    e.stopPropagation();
                                    removeField(field.id);
                                } }), _jsx(ChevronUpIcon, { className: "h-6 w-6 text-gray-600" })] }), isOpen: openIndex === index, onToggle: () => setOpenIndex(openIndex === index ? null : index), children: [_jsxs("div", { className: "flex space-x-2 items-center", children: [_jsx(Input, { type: "text", placeholder: "Question Title", value: field.label, onChange: (e) => updateField(field.id, { label: e.target.value }), className: "w-full" }), allFieldsValid && _jsx(_Fragment, { children: loading[field.id] ? _jsx(ArrowPathIcon, { className: "h-6 w-6 text-gray-600" }) : _jsx(CheckCircleIcon, { className: "h-5 w-5 text-green-500 ml-2" }) }), _jsx(ChevronDownIcon, { className: "h-5 w-5 text-gray-400" })] }), _jsxs("div", { className: "flex space-x-2 items-center", children: [_jsxs(Select, { value: field.type, placeholder: "Question Type", className: "mt-4 mb-4 w-full", onChange: (e) => updateField(field.id, { type: e.target.value }), children: [_jsx("option", { value: "text", children: "Text" }), _jsx("option", { value: "number", children: "Number" }), _jsx("option", { value: "select", children: "Select" })] }), _jsxs("label", { className: "flex items-center mt-2", children: [_jsx("input", { type: "checkbox", checked: field.required || false, onChange: (e) => updateField(field.id, { required: e.target.checked }), onClick: (e) => e.stopPropagation() }), _jsx("span", { className: "ml-2 text-black", children: "Required" })] })] }), field.type === "select" && (_jsx(Input, { type: "text", placeholder: "Comma-separated options", onChange: (e) => updateField(field.id, { options: e.target.value.split(",") }), className: "w-full", value: field.options?.join(",") || "" })), field.type === "text" && (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { type: "number", placeholder: "Min Length", onChange: (e) => updateField(field.id, { minLength: parseInt(e.target.value) || undefined }) }), _jsx(Input, { type: "number", placeholder: "Max Length", onChange: (e) => updateField(field.id, { maxLength: parseInt(e.target.value) || undefined }) }), _jsx(Input, { type: "text", placeholder: "Regex Pattern", onChange: (e) => updateField(field.id, { pattern: e.target.value }) })] })), field.type === "number" && (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { type: "number", placeholder: "Min Value", onChange: (e) => updateField(field.id, { minValue: parseFloat(e.target.value) || undefined }) }), _jsx(Input, { type: "number", placeholder: "Max Value", onChange: (e) => updateField(field.id, { maxValue: parseFloat(e.target.value) || undefined }) })] }))] }, field.id))), _jsxs("div", { className: "flex", children: [allFieldsValid && _jsxs(Button, { onClick: addField, className: "mr-2 bg-white flex items-center", disabled: addingQuestion, children: [addingQuestion ? _jsx(ArrowPathIcon, { className: "h-6 w-6 mx-6 text-gray-600" })
                                : _jsx(PlusIcon, { className: "h-6 w-6 text-gray-600" }), "Add Question"] }), allFieldsValid && fields.length >= 1 && _jsx(NavLink, { to: "/form", children: _jsx(Button, { variant: "secondary", onClick: generateSchema, className: "flex items-center", children: "Generate Schema" }) })] }), ToastComponent] }));
};
// export { FormField };
export default FormBuilder;
