/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Company_Update_Permission_DeniedInputs */

const en_service_company_update_permission_denied = /** @type {(inputs: Service_Company_Update_Permission_DeniedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You do not have permission to update company info. Contact a workspace admin.`)
};

const zh_service_company_update_permission_denied = /** @type {(inputs: Service_Company_Update_Permission_DeniedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号暂无修改公司信息权限，请联系工作区管理员。`)
};

/**
* | output |
* | --- |
* | "You do not have permission to update company info. Contact a workspace admin." |
*
* @param {Service_Company_Update_Permission_DeniedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_company_update_permission_denied = /** @type {((inputs?: Service_Company_Update_Permission_DeniedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Company_Update_Permission_DeniedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_company_update_permission_denied(inputs)
	return zh_service_company_update_permission_denied(inputs)
});