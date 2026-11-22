/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Feishu_Channels_Read_FailedInputs */

const en_service_feishu_channels_read_failed = /** @type {(inputs: Service_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read Feishu channels.`)
};

const zh_service_feishu_channels_read_failed = /** @type {(inputs: Service_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取飞书频道失败。`)
};

/**
* | output |
* | --- |
* | "Failed to read Feishu channels." |
*
* @param {Service_Feishu_Channels_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_feishu_channels_read_failed = /** @type {((inputs?: Service_Feishu_Channels_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Feishu_Channels_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_feishu_channels_read_failed(inputs)
	return zh_service_feishu_channels_read_failed(inputs)
});