import React from "react";
import PickItem from "./PickItem";

const picks = [
    { label: "add", type: "add" },
    { label: "PINKAROUND - YLS45...", status: "in-progress" },
    { label: "Книга «Есенціалізм»" },
    { label: "Книга «Нові кавові п..." },
    { label: "Комплект книг Кров...", status: "picked" },
    { label: "Іздрик збірка 'Лінив...'", status: "picked" },
    { label: "Трояндочки", status: "picked" },
    { label: "Так ніхто не кохав Ан...", status: "picked" },
];

const PickList = () => {
    return (
        <div className="pick-list">
            <h3>your picklist</h3>
            <input type="text" placeholder="Search" className="pick-search" />
            <div className="pick-grid">
                {picks.map((pick, index) => (
                    <PickItem key={index} {...pick} />
                ))}
            </div>
        </div>
    );
};

export default PickList;
