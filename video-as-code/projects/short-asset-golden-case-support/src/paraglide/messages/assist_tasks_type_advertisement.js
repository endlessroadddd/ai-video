/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_AdvertisementInputs */

const en_assist_tasks_type_advertisement = /** @type {(inputs: Assist_Tasks_Type_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Advertisement`)
};

const zh_assist_tasks_type_advertisement = /** @type {(inputs: Assist_Tasks_Type_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告`)
};

/**
* | output |
* | --- |
* | "Advertisement" |
*
* @param {Assist_Tasks_Type_AdvertisementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_advertisement = /** @type {((inputs?: Assist_Tasks_Type_AdvertisementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_AdvertisementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_advertisement(inputs)
	return zh_assist_tasks_type_advertisement(inputs)
});