import { useState } from "react";
import { citiess, categoriess } from "../../lib/Constant";

export default function useSearch() {
    const [activeTab, setActiveTab] = useState("real-estate");
    const [selectedCity, setSelectedCity] = useState(citiess[0]);
    const [selectedCategory, setSelectedCategory] = useState(categoriess[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAdvancedModal, setShowAdvancedModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === "services") {
            alert(`Searching for service: ${searchQuery}`);
        } else {
            alert(
                `Searching in Real Estate for city: ${selectedCity}, category: ${selectedCategory}`
            );
        }
    };

    return {
        activeTab,
        setActiveTab,
        selectedCity,
        setSelectedCity,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        showAdvancedModal,
        setShowAdvancedModal,
        handleSubmit,
    };
}
