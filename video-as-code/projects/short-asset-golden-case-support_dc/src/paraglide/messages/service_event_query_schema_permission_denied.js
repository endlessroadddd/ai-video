/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ schemaName: NonNullable<unknown> }} Service_Event_Query_Schema_Permission_DeniedInputs */

const en_service_event_query_schema_permission_denied = /** @type {(inputs: Service_Event_Query_Schema_Permission_DeniedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The current account cannot access the \`${i?.schemaName}\` schema. Grant schema usage and table read access to the browser role, or query through a server proxy and try again.`)
};

const zh_service_event_query_schema_permission_denied = /** @type {(inputs: Service_Event_Query_Schema_Permission_DeniedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`当前账号没有 \`${i?.schemaName}\` schema 的访问权限。请在数据库端为浏览器角色授予 schema 使用权限和表读取权限，或通过服务端代理查询后再重试。`)
};

/**
* | output |
* | --- |
* | "The current account cannot access the `{schemaName}` schema. Grant schema usage and table read access to the browser role, or query through a server proxy an..." |
*
* @param {Service_Event_Query_Schema_Permission_DeniedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_schema_permission_denied = /** @type {((inputs: Service_Event_Query_Schema_Permission_DeniedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_Schema_Permission_DeniedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_event_query_schema_permission_denied(inputs)
	return zh_service_event_query_schema_permission_denied(inputs)
});