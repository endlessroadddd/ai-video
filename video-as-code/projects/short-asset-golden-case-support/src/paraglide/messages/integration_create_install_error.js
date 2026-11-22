/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_Create_Install_ErrorInputs */

const en_integration_create_install_error = /** @type {(inputs: Integration_Create_Install_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to create ${i?.platform} install link.`)
};

const zh_integration_create_install_error = /** @type {(inputs: Integration_Create_Install_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`创建 ${i?.platform} 安装链接失败。`)
};

/**
* | output |
* | --- |
* | "Failed to create {platform} install link." |
*
* @param {Integration_Create_Install_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_create_install_error = /** @type {((inputs: Integration_Create_Install_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Create_Install_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_create_install_error(inputs)
	return zh_integration_create_install_error(inputs)
});