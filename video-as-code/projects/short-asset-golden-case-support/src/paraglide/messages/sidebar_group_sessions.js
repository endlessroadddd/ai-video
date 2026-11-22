/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Group_SessionsInputs */

const en_sidebar_group_sessions = /** @type {(inputs: Sidebar_Group_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sessions`)
};

const zh_sidebar_group_sessions = /** @type {(inputs: Sidebar_Group_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

/**
* | output |
* | --- |
* | "Sessions" |
*
* @param {Sidebar_Group_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_sessions = /** @type {((inputs?: Sidebar_Group_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_group_sessions(inputs)
	return zh_sidebar_group_sessions(inputs)
});