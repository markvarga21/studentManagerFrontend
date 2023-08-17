const AddressInput = ({ addressType, customAddress }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {addressType}
      </label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex items-center space-x-2">
          {customAddress === undefined ? (
            <input
              type="text"
              name={`${addressType}_country`}
              id={`${addressType}_country`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"Country"}
              required
            />
          ) : (
            <input
              type="text"
              name={`${addressType}_country`}
              id={`${addressType}_country`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"Country"}
              required
              value={customAddress.country}
            />
          )}
          {customAddress === undefined ? (
            <input
              type="text"
              name={`${addressType}_city`}
              id={`${addressType}_city`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"City"}
              required
            />
          ) : (
            <input
              type="text"
              name={`${addressType}_city`}
              id={`${addressType}_city`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"City"}
              required
              value={customAddress.city}
            />
          )}
          {customAddress === undefined ? (
            <input
              type="text"
              name={`${addressType}_street`}
              id={`${addressType}_street`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"Street"}
              required
            />
          ) : (
            <input
              type="text"
              name={`${addressType}_street`}
              id={`${addressType}_street`}
              className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={"Street"}
              required
              value={customAddress.street}
            />
          )}
          {customAddress === undefined ? (
            <input
              type="number"
              name={`${addressType}_number`}
              id={`${addressType}_number`}
              className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={1}
              required
              min={1}
            />
          ) : (
            <input
              type="number"
              name={`${addressType}_number`}
              id={`${addressType}_number`}
              className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={1}
              required
              min={1}
              value={customAddress.number}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
