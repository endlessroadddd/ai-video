/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Profile_Name_ConflictInputs */

const en_service_profile_name_conflict = /** @type {(inputs: Service_Profile_Name_ConflictInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This nickname is already in use in the current workspace. Please choose another one.`)
};

const zh_service_profile_name_conflict = /** @type {(inputs: Service_Profile_Name_ConflictInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该昵称在当前工作区已被使用，请更换一个昵称。`)
};

/**
* | output |
* | --- |
* | "This nickname is already in use in the current workspace. Please choose another one." |
*
* @param {Service_Profile_Name_ConflictInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_profile_name_conflict = /** @type {((inputs?: Service_Profile_Name_ConflictInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Profile_Name_ConflictInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_profile_name_conflict(inputs)
	return zh_service_profile_name_conflict(inputs)
});