interface AccordionProps {
    headerContent: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}
export declare const Accordion: React.FC<AccordionProps>;
export {};
