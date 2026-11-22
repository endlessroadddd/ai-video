/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Creating_Install_LinkInputs */

const en_integration_creating_install_link = /** @type {(inputs: Integration_Creating_Install_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creating install link...`)
};

const zh_integration_creating_install_link = /** @type {(inputs: Integration_Creating_Install_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在创建安装链接...`)
};

/**
* | output |
* | --- |
* | "Creating install link..." |
*
* @param {Integration_Creating_Install_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_creating_install_link = /** @type {((inputs?: Integration_Creating_Install_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Creating_Install_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_creating_install_link(inputs)
	return zh_integration_creating_install_link(inputs)
});