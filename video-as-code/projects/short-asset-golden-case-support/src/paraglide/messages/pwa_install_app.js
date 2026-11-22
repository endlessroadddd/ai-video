/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Pwa_Install_AppInputs */

const en_pwa_install_app = /** @type {(inputs: Pwa_Install_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install app`)
};

const zh_pwa_install_app = /** @type {(inputs: Pwa_Install_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装应用`)
};

/**
* | output |
* | --- |
* | "Install app" |
*
* @param {Pwa_Install_AppInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const pwa_install_app = /** @type {((inputs?: Pwa_Install_AppInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pwa_Install_AppInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_pwa_install_app(inputs)
	return zh_pwa_install_app(inputs)
});