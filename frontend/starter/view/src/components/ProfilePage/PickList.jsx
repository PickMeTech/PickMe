import React from "react";
import Search from "/src/assets/search.png";
import PickItem from "./PickItem";
import PickItemAdd from "./PickItem";

const picks = [
    { id: 1, type: "add", label: "add pick" },
    { id: 2, label: "PINKAROUND - YLS45...", status: "in-progress" },
    { id: 3, label: "Книга «Есенціалізм»" },
    { id: 4, label: "Книга «Нові кавові п..." },
    { id: 5, label: "Комплект книг Кров...", status: "picked" },
    { id: 6, label: "Іздрик збірка «Лінив...»", status: "picked" },
    { id: 7, label: "Трояндочки", status: "picked" },
    { id: 8, label: "Так ніхто не кохав Ан...", status: "picked" },
];

const PickList = () => {
    const groupedPicks = {
        active: picks.filter(pick => !pick.status || pick.type === "add"),
        picked: picks.filter(pick => pick.status === "picked")
    };

    return (
        <div className="picklist-container">
            <div className="picklist-label">your picklist</div>
            <div className="picklist-section">
                <div className="search-field small">
                    <img src={Search} className="search-icon" alt="Search" />
                    <div className="search-text">Search</div>
                </div>

                <div className="wishes-grid">
                    {groupedPicks.active.map(pick => (
                        <PickItem key={pick.id} {...pick} />
                    ))}
                </div>

                <div className="wishes-grid">
                    {groupedPicks.picked.map(pick => (
                        <PickItem key={pick.id} {...pick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PickList;