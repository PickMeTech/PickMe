import React, { useEffect, useState } from "react";
import WishItem   from "./WishItem";
import { wishApi } from "@/api/WishAPI";
import Search from "../../assets/search.png";
import "bootstrap/dist/css/bootstrap.min.css";

const WishList = ({ wishListId, onAdd }) => {
    const [wishes, setWishes]   = useState([]);
    const [search, setSearch]   = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (!wishListId) return;
        wishApi
            .getAllWishes(wishListId)
            .then(setWishes)
            .catch(() => setError("Failed to load wishes"))
            .finally(() => setLoading(false));
    }, [wishListId]);

    if (loading) return <div className="text-center py-5">Loading picks…</div>;
    if (error)   return <div className="alert alert-danger">{error}</div>;

    const filtered = wishes.filter(w =>
        w.title.toLowerCase().includes(search.toLowerCase())
    );

    const active = [{ type: "add", id: "add" }, ...filtered.filter(w => w.status !== "picked")];
    const picked = filtered.filter(w => w.status === "picked");

    return (
        <div className="container py-4">

            {/* title */}
            <h5 className="text-uppercase text-muted mb-3">your picklist</h5>

            {/* search */}
            <div className="input-group mb-4">
        <span className="input-group-text bg-white border-end-0">
          <img src={SearchIcon} alt="Search" style={{ width: 20 }} />
        </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* active cards */}
            <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
                {active.map(item =>
                    item.type === "add" ? (
                        <div className="col" key="add">
                            <WishItem type="add" onAdd={onAdd} />
                        </div>
                    ) : (
                        <div className="col" key={item.id}>
                            <WishItem {...item} />
                        </div>
                    )
                )}
            </div>

            {/* picked cards */}
            {picked.length > 0 && (
                <>
                    <h6 className="text-muted mb-2">Picked</h6>
                    <div className="row row-cols-2 row-cols-md-4 g-3">
                        {picked.map(item => (
                            <div className="col" key={item.id}>
                                <WishItem {...item} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default WishList;
