/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_LuciusInputs */

const en_role_lucius = /** @type {(inputs: Role_LuciusInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

const zh_role_lucius = /** @type {(inputs: Role_LuciusInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

/**
* | output |
* | --- |
* | "Lucius" |
*
* @param {Role_LuciusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_lucius = /** @type {((inputs?: Role_LuciusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_LuciusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_lucius(inputs)
	return zh_role_lucius(inputs)
});