/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Owner_Admin_OnlyInputs */

const en_integration_owner_admin_only = /** @type {(inputs: Integration_Owner_Admin_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can operate.`)
};

const zh_integration_owner_admin_only = /** @type {(inputs: Integration_Owner_Admin_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可操作。`)
};

/**
* | output |
* | --- |
* | "Only Owner/Admin can operate." |
*
* @param {Integration_Owner_Admin_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_owner_admin_only = /** @type {((inputs?: Integration_Owner_Admin_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Owner_Admin_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_owner_admin_only(inputs)
	return zh_integration_owner_admin_only(inputs)
});