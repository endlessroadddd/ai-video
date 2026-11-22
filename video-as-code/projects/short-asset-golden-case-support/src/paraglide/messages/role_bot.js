/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_BotInputs */

const en_role_bot = /** @type {(inputs: Role_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot`)
};

const zh_role_bot = /** @type {(inputs: Role_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot`)
};

/**
* | output |
* | --- |
* | "Bot" |
*
* @param {Role_BotInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_bot = /** @type {((inputs?: Role_BotInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_BotInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_bot(inputs)
	return zh_role_bot(inputs)
});