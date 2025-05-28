import React, { useEffect, useState, useCallback, useMemo } from "react";
import WishList from "@/components/WishList";
import Form from "@/components/Form";
import SearchPanel  from "@/components/SearchPanel";
import Button from "@/components/Button";
import { wishListApi } from "@/api/WishListAPI";
import { userApi } from "@/api/UserAPI";
import "@/styles/WishLists.css";

const WishLists = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

    // // Mock data for development/testing
    // const mockData = useMemo(() => ({
    //     user: {
    //         id: "user-123",
    //         name: "Test User",
    //         email: "test@example.com"
    //     },
    //     lists: [
    //         {
    //             id: "list-1",
    //             name: "Birthday Wishlist",
    //             description: "Things I want for my birthday",
    //             userId: "user-123"
    //         },
    //         {
    //             id: "list-2",
    //             name: "Christmas Wishlist",
    //             description: "Holiday gift ideas",
    //             userId: "user-123"
    //         }
    //     ],
    //     wishes: {
    //         "list-1": [
    //             {
    //                 id: "wish-1",
    //                 title: "New Headphones",
    //                 description: "Noise cancelling headphones",
    //                 status: "active",
    //                 price: "199.99",
    //                 url: "https://example.com/headphones"
    //             },
    //             {
    //                 id: "wish-2",
    //                 title: "Book: React Patterns",
    //                 description: "Latest edition",
    //                 status: "picked",
    //                 price: "39.99",
    //                 url: "https://example.com/book"
    //             }
    //         ],
    //         "list-2": [
    //             {
    //                 id: "wish-3",
    //                 title: "Winter Jacket",
    //                 description: "Size L, black color",
    //                 status: "active",
    //                 price: "129.99",
    //                 url: "https://example.com/jacket"
    //             }
    //         ]
    //     }
    // }), []);

    // // Use mock data instead of API calls for development
    // const fetchInitialData = useCallback(async () => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         // Comment out actual API calls and use mock data instead
    //         // const userData = await userApi.me();
    //         // setUser(userData);
    //         // const listsData = await wishListApi.getAllWishLists(userData.id);
    //
    //         setUser(mockData.user);
    //         setLists(mockData.lists);
    //         setCurrentListId(mockData.lists[0]?.id || null);
    //     } catch (err) {
    //         setError("Failed to load data");
    //     } finally {
    //         setLoading(false);
    //     }
    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await userApi.me();
            setUser(userData);
            const listsData = await wishListApi.getAllWishLists(userData.id);
            setLists(listsData);
            setCurrentListId(listsData[0]?.id || null);
        } catch (err) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handleAddWishlist = async (data) => {
        if (!user) return;
        const newList = await wishListApi.createWishList(user.id, data);
        setLists(prev => {
            if (prev.length === 0) setCurrentListId(newList.id);
            return [...prev, newList];
        });
        setShowAdd(false);
    };

    const handleDeleteList = async (listId) => {
        if (!user || !window.confirm("Are you sure you want to delete this wish list?")) return;
        await wishListApi.deleteWishList(user.id, listId);
        setLists(prev => {
            const next = prev.filter(list => list.id !== listId);
            setCurrentListId(next[0]?.id || null);
            return next;
        });
    };

    const filteredLists = useMemo(() =>
        lists.filter(list =>
            list.name.toLowerCase().includes(search.toLowerCase())
        ), [lists, search]);

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
                <Button className="btn btn-outline-danger btn-sm" onClick={fetchInitialData}>Try again</Button>
            </div>
        );
    }
    if (lists.length === 0) {
        return (
            <div className="wishlists-container d-flex justify-content-center py-5">
                {!showAdd ? (
                    <Button onClick={() => setShowAdd(true)}>
                        + Add Wishlist
                    </Button>
                ) : (
                    <Form
                        formType="add-wishlist"
                        onSubmit={handleAddWishlist}
                        buttonText="Add"
                        initialData={{ name: "", description: "" }}
                        className="rounded-form"
                    />
                )}
            </div>
        );
    }

    return (
        <div className="wishlists-container">
            <div className="wishlists-section">
                <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1 me-3">
                        <SearchPanel
                            search={search}
                            setSearch={setSearch}
                            placeholder="Search in wish lists"
                        />
                    </div>
                    <div>
                        <Button onClick={() => setShowAdd(v => !v)}>
                            {showAdd ? "Cancel" : "+ Add Wishlist"}
                        </Button>
                    </div>
                </div>

                {showAdd && (
                    <div className="mb-3">
                        <Form
                            formType="add-wishlist"
                            onSubmit={handleAddWishlist}
                            buttonText="Add"
                            initialData={{ name: "", description: "" }}
                        />
                    </div>
                )}

                {filteredLists.length > 0 && (
                    <>
                        <div className="mb-3 d-flex flex-wrap gap-2">
                            {filteredLists.map(list => (
                                <button
                                    className={`wishlist-tab ${currentListId === list.id ? "active" : ""}`}
                                    onClick={() => setCurrentListId(list.id)}
                                >
                                    {list.name}
                                </button>

                            ))}
                        </div>
                        {currentListId && (
                            <WishList
                                listId={currentListId}
                                title={lists.find(l => l.id === currentListId)?.name || ""}
                                onDeleteList={() => handleDeleteList(currentListId)}
                            />
                        )}
                    </>
                )}

                {filteredLists.length === 0 && (
                    <div className="text-center text-muted py-5">
                        <i className="fas fa-search fa-3x mb-3"></i>
                        <p>No results found for "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishLists;