import React, { useEffect, useState } from "react";
import WishItem from "@/components/WishItem";
import Form from "@/components/Form";
import SearchPanel  from "@/components/SearchPanel";
import Button from "@/components/Button";
import { wishApi } from "@/api/WishAPI";
import "@/styles/WishLists.css";

const WishList = ({ listId, title, onDeleteList }) => {
    const [wishes, setWishes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredWishes, setFilteredWishes] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const loadWishes = () => {
        setLoading(true);
        setError(null);
        wishApi.getAllWishes(listId)
            .then(data => setWishes(data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (listId) loadWishes();
    }, [listId, loadWishes]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredWishes(
                wishes.filter(wish =>
                    wish.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        }, 300)
        return () => clearTimeout(timeoutId);
    }, [wishes, search]);

    const handleWishAdded = async (wishData) => {
        const newWish = await wishApi.createWish(listId, wishData);
        setWishes(prev => [...prev, newWish]);
        setShowAdd(false);
    };

    const handleStatusChange = (wishId, newStatus) => {
        setWishes(prev =>
            prev.map(wish =>
                wish.id === wishId ? { ...wish, status: newStatus } : wish
            )
        );
    };

    const handleWishDelete = (wishId) => {
        setWishes(prev => prev.filter(wish => wish.id !== wishId));
    };


    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading…</span>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
                {error}
                <button className="btn btn-outline-danger btn-sm" onClick={loadWishes}>Try again</button>
            </div>
        );
    }

    return (
        <div className="picklist-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="header-title">{title || "Your wish list"}</h1>
                {onDeleteList && (
                    <Button onClick={onDeleteList}>
                        Delete List
                    </Button>
                )}
            </div>
            <div className="search-container mb-4 d-flex align-items-center">
                <SearchPanel search={search} setSearch={setSearch}/>
                <Button onClick={() => setShowAdd(v => !v)}>
                    {showAdd ? "Cancel" : "Add Wish"}
                </Button>
            </div>

            {showAdd && (
                <div className="mb-3">
                    <Form
                        formType="add-wish"
                        onSubmit={handleWishAdded}
                        buttonText="Add Wish"
                        initialData={{title: "", description: "", price: "", url: "", imageUrl: ""}}
                    />
                </div>
            )}
            <div className="row g-4">
                {filteredWishes.map(item => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                        <WishItem
                            {...item}
                            wishListId={listId}
                            onStatusChange={handleStatusChange}
                            onDelete={handleWishDelete}
                        />
                    </div>
                ))}
                {filteredWishes.length === 0 && wishes.length > 0 && (
                    <div className="col-12">
                        <div className="text-center text-muted py-5">
                            <i className="fas fa-search fa-3x mb-3"></i>
                            <p>No results found for "{search}"</p>
                        </div>
                    </div>
                )}
                {wishes.length === 0 && (
                    <div className="col-12">
                        <div className="text-center text-muted py-5">
                            <i className="fas fa-heart fa-3x mb-3"></i>
                            <p>Your wish list is empty</p>
                            <p>Add your first wish by clicking "Add Wish"</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;