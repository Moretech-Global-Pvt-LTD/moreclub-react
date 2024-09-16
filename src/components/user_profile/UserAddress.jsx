
import PropTypes from "prop-types";
import AutoCompleteInput from "../Googlemap/AutofillInput";

AddressForm.propTypes = {
    address: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
};

export default function AddressForm({ address, onSubmit, setAddress , loading}) {
    const handleManualInputChange = (event, stateProperty) => {
        const newAddress = { ...address };
        newAddress[stateProperty] = event.target.value;

        setAddress(newAddress);
    };

    return (
        <form className="form d-flex flex-column gap-2" onSubmit={onSubmit}>
            <label htmlFor="address">Address</label>
            <AutoCompleteInput
                setAddress={setAddress}
                handleManualInputChange={handleManualInputChange}
                streetAndNumber={address.streetAndNumber}
            />

            <label htmlFor="city">City</label>
            <input
                type="text"
                id="city"
                placeholder="City"
                className="form-control"
                value={address.place}
                onChange={(event) => handleManualInputChange(event, "place")}
            />

            <label htmlFor="state">State/Province/Region</label>
            <input
                type="text"
                id="state"
                placeholder="State/Province/Region"
                className="form-control"
                value={address.region}
                onChange={(event) => handleManualInputChange(event, "region")}
            />

            <label htmlFor="postcode">Postcode</label>
            <input
                type="text"
                id="postcode"
                placeholder="Postcode"
                className="form-control"
                value={address.postcode}
                onChange={(event) => handleManualInputChange(event, "postcode")}
            />

            <label htmlFor="House No">House No (optional)</label>
            <input
                type="text"
                id="houseno"
                placeholder="House No"
                className="form-control"
                value={address.houseno}
                onChange={(event) => handleManualInputChange(event, "houseno")}
            />

            <div className="buttons mt-3">
                <button
                    className="btn btn-warning w-100 rounded-pill"
                    type="submit"
                    disabled={loading}
                >
                   {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
                    <i className="bi bi-sd-card-fill me-1" />
                    Save changes
                </button>
                
            </div>
        </form>
    );
}