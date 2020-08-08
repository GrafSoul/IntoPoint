export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const updateByPropertyName = (propertyName, value) => ({
	[propertyName]: value,
});


