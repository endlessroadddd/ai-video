/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Workgroup_Helper_Connected_NamedInputs */

const en_workgroup_helper_connected_named = /** @type {(inputs: Workgroup_Helper_Connected_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Connected to ${i?.name}`)
};

const zh_workgroup_helper_connected_named = /** @type {(inputs: Workgroup_Helper_Connected_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已关联 ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Connected to {name}" |
*
* @param {Workgroup_Helper_Connected_NamedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_helper_connected_named = /** @type {((inputs: Workgroup_Helper_Connected_NamedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Helper_Connected_NamedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_helper_connected_named(inputs)
	return zh_workgroup_helper_connected_named(inputs)
});