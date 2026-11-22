/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_BadgeInputs */

const en_workspace_badge = /** @type {(inputs: Workspace_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup`)
};

const zh_workspace_badge = /** @type {(inputs: Workspace_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群`)
};

/**
* | output |
* | --- |
* | "Workgroup" |
*
* @param {Workspace_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_badge = /** @type {((inputs?: Workspace_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_badge(inputs)
	return zh_workspace_badge(inputs)
});