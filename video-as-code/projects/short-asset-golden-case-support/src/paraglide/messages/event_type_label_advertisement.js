/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_AdvertisementInputs */

const en_event_type_label_advertisement = /** @type {(inputs: Event_Type_Label_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Advertisement`)
};

const zh_event_type_label_advertisement = /** @type {(inputs: Event_Type_Label_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告`)
};

/**
* | output |
* | --- |
* | "Advertisement" |
*
* @param {Event_Type_Label_AdvertisementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_advertisement = /** @type {((inputs?: Event_Type_Label_AdvertisementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_AdvertisementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_advertisement(inputs)
	return zh_event_type_label_advertisement(inputs)
});