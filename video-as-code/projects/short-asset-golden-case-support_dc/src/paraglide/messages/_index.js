/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} App_DescriptionInputs */
/** @typedef {{}} App_TitleInputs */
/** @typedef {{}} Auth_BackInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Callback_FailedInputs */
/** @typedef {{}} Auth_Callback_Invalid_LinkInputs */
/** @typedef {{}} Auth_Callback_Missing_SessionInputs */
/** @typedef {{}} Auth_Callback_Unknown_ErrorInputs */
/** @typedef {{}} Auth_Email_LabelInputs */
/** @typedef {{}} Auth_Email_LoginInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Email_Login_FailedInputs */
/** @typedef {{}} Auth_Email_PlaceholderInputs */
/** @typedef {{}} Auth_Email_RequiredInputs */
/** @typedef {{}} Auth_Get_Magic_LinkInputs */
/** @typedef {{}} Auth_Login_TitleInputs */
/** @typedef {{}} Auth_Login_With_GithubInputs */
/** @typedef {{}} Auth_Login_With_GoogleInputs */
/** @typedef {{}} Auth_Magic_Link_Sent_HintInputs */
/** @typedef {{ email: NonNullable<unknown> }} Auth_Magic_Link_Sent_ToInputs */
/** @typedef {{}} Auth_OrInputs */
/** @typedef {{}} Auth_Provider_GithubInputs */
/** @typedef {{}} Auth_Provider_GoogleInputs */
/** @typedef {{ provider: NonNullable<unknown>, message: NonNullable<unknown> }} Auth_Provider_Login_FailedInputs */
/** @typedef {{}} Auth_ResendInputs */
/** @typedef {{ seconds: NonNullable<unknown> }} Auth_Resend_CountdownInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Resend_Email_FailedInputs */
/** @typedef {{}} Auth_Unknown_Error_RetryInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_TitleInputs */
/** @typedef {{}} Assist_Tasks_Add_SupplementalInputs */
/** @typedef {{}} Assist_Tasks_Assignee_LabelInputs */
/** @typedef {{}} Assist_Tasks_Close_Event_DetailInputs */
/** @typedef {{}} Assist_Tasks_Close_Session_DetailInputs */
/** @typedef {{}} Assist_Tasks_Confirm_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Confirming_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Rejecting_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Show_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Hide_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Detail_Load_Failed_TitleInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_DescInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_TitleInputs */
/** @typedef {{}} Assist_Tasks_Empty_DescInputs */
/** @typedef {{}} Assist_Tasks_Empty_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Session_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Load_FailedInputs */
/** @typedef {{}} Assist_Tasks_Filter_All_TypesInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_AllInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_IgnoredInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_LabelInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_PendingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ProcessingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ResolvedInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_Filter_Type_LabelInputs */
/** @typedef {{}} Assist_Tasks_IgnoreInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_ActionInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_DescInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_TitleInputs */
/** @typedef {{}} Assist_Tasks_Ignore_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Ignore_SuccessInputs */
/** @typedef {{}} Assist_Tasks_IgnoringInputs */
/** @typedef {{}} Assist_Tasks_List_TitleInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Messages_Load_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Message_SendInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_PendingInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_SuccessInputs */
/** @typedef {{}} Assist_Tasks_No_MessagesInputs */
/** @typedef {{}} Assist_Tasks_No_OwnerInputs */
/** @typedef {{}} Assist_Tasks_No_Owner_ShortInputs */
/** @typedef {{}} Assist_Tasks_No_SummaryInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_DaysInputs */
/** @typedef {{}} Assist_Tasks_Overdue_DefaultInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_HoursInputs */
/** @typedef {{}} Assist_Tasks_Participant_Avatar_AltInputs */
/** @typedef {{}} Assist_Tasks_Review_ConfirmedInputs */
/** @typedef {{}} Assist_Tasks_Review_PendingInputs */
/** @typedef {{}} Assist_Tasks_Review_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_ResolveInputs */
/** @typedef {{}} Assist_Tasks_Resolve_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Resolve_PendingInputs */
/** @typedef {{}} Assist_Tasks_Resolve_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Save_PendingInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Search_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Supplemental_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_TakeoverInputs */
/** @typedef {{}} Assist_Tasks_Takeover_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Takeover_PendingInputs */
/** @typedef {{}} Assist_Tasks_Takeover_SuccessInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Timed_Out_CountInputs */
/** @typedef {{}} Assist_Tasks_Type_AdvertisementInputs */
/** @typedef {{}} Assist_Tasks_Type_Assign_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Bug_ReportInputs */
/** @typedef {{}} Assist_Tasks_Type_Business_CooperationInputs */
/** @typedef {{}} Assist_Tasks_Type_Exception_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_Knowledge_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Message_DeletionInputs */
/** @typedef {{}} Assist_Tasks_Type_Order_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Payment_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Product_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_UnknownInputs */
/** @typedef {{}} Assist_Tasks_Type_Unrecognized_InformationInputs */
/** @typedef {{}} Assist_Tasks_Type_Usage_IssueInputs */
/** @typedef {{}} Assist_Tasks_Unknown_ChannelInputs */
/** @typedef {{}} Assist_Tasks_Unnamed_TaskInputs */
/** @typedef {{}} Assist_Tasks_View_Adopted_KnowledgeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_View_Adopted_Knowledge_CountInputs */
/** @typedef {{ title: NonNullable<unknown> }} Assist_Tasks_View_ItemInputs */
/** @typedef {{}} Client_Chat_Attachment_AltInputs */
/** @typedef {{}} Client_Chat_Draft_SessionInputs */
/** @typedef {{}} Client_Chat_Draft_BadgeInputs */
/** @typedef {{}} Client_Chat_Loading_Session_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_Brand_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_SessionsInputs */
/** @typedef {{}} Client_Chat_Empty_Input_HintInputs */
/** @typedef {{ count: NonNullable<unknown> }} Client_Chat_Image_Count_LimitInputs */
/** @typedef {{}} Client_Chat_Image_OnlyInputs */
/** @typedef {{ size: NonNullable<unknown> }} Client_Chat_Image_Size_LimitInputs */
/** @typedef {{}} Client_Chat_History_SessionsInputs */
/** @typedef {{}} Client_Chat_Input_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Load_Sessions_FailedInputs */
/** @typedef {{}} Client_Chat_Copy_MessageInputs */
/** @typedef {{}} Client_Chat_Copy_SuccessInputs */
/** @typedef {{}} Client_Chat_Copy_FailedInputs */
/** @typedef {{}} Client_Chat_Like_MessageInputs */
/** @typedef {{}} Client_Chat_Dislike_MessageInputs */
/** @typedef {{}} Client_Chat_Regenerate_MessageInputs */
/** @typedef {{}} Client_Chat_Lucius_NameInputs */
/** @typedef {{}} Client_Chat_MeInputs */
/** @typedef {{}} Client_Chat_More_ActionsInputs */
/** @typedef {{}} Client_Chat_New_SessionInputs */
/** @typedef {{}} Client_Chat_Next_PageInputs */
/** @typedef {{}} Client_Chat_No_MessagesInputs */
/** @typedef {{ page: NonNullable<unknown>, totalPages: NonNullable<unknown>, total: NonNullable<unknown> }} Client_Chat_Page_StatusInputs */
/** @typedef {{}} Client_Chat_Pin_SessionInputs */
/** @typedef {{}} Client_Chat_Preview_EmptyInputs */
/** @typedef {{}} Client_Chat_Preview_FallbackInputs */
/** @typedef {{}} Client_Chat_Preview_ImageInputs */
/** @typedef {{}} Client_Chat_Prev_PageInputs */
/** @typedef {{}} Client_Chat_Prompt_CapabilitiesInputs */
/** @typedef {{}} Client_Chat_Prompt_Invite_AgentInputs */
/** @typedef {{}} Client_Chat_Prompt_Role_DifferenceInputs */
/** @typedef {{}} Client_Chat_Prompt_Update_KnowledgeInputs */
/** @typedef {{ title: NonNullable<unknown> }} Client_Chat_Reply_Ready_DescriptionInputs */
/** @typedef {{}} Client_Chat_Reply_Ready_TitleInputs */
/** @typedef {{}} Client_Chat_ReplyingInputs */
/** @typedef {{}} Client_Chat_Remove_SessionInputs */
/** @typedef {{}} Client_Chat_Remove_Selected_ImageInputs */
/** @typedef {{}} Client_Chat_Rename_SessionInputs */
/** @typedef {{}} Client_Chat_Rename_Session_PromptInputs */
/** @typedef {{}} Client_Chat_SearchInputs */
/** @typedef {{}} Client_Chat_Search_EmptyInputs */
/** @typedef {{}} Client_Chat_Search_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Search_TitleInputs */
/** @typedef {{}} Client_Chat_Select_CompanyInputs */
/** @typedef {{}} Client_Chat_Send_MessageInputs */
/** @typedef {{}} Client_Chat_Session_TodayInputs */
/** @typedef {{}} Client_Chat_Session_Week_AgoInputs */
/** @typedef {{}} Client_Chat_Session_YesterdayInputs */
/** @typedef {{}} Client_Chat_SendingInputs */
/** @typedef {{}} Client_Chat_Starred_SessionsInputs */
/** @typedef {{}} Client_Chat_SessionsInputs */
/** @typedef {{}} Client_Chat_TitleInputs */
/** @typedef {{}} Client_Chat_Unpin_SessionInputs */
/** @typedef {{}} Client_Chat_Upload_ImageInputs */
/** @typedef {{}} Client_Chat_User_FallbackInputs */
/** @typedef {{}} Client_Chat_View_ReplyInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_CloseInputs */
/** @typedef {{}} Common_Coming_SoonInputs */
/** @typedef {{}} Common_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Hours_AgoInputs */
/** @typedef {{}} Common_Just_NowInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Minutes_AgoInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_Next_StepInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_UnknownInputs */
/** @typedef {{}} Pwa_Install_AppInputs */
/** @typedef {{}} Language_LabelInputs */
/** @typedef {{}} Language_ZhInputs */
/** @typedef {{}} Language_EnInputs */
/** @typedef {{}} Header_Action_FilesInputs */
/** @typedef {{}} Header_Action_MenuInputs */
/** @typedef {{}} Header_Action_NotificationsInputs */
/** @typedef {{}} Header_BrandInputs */
/** @typedef {{}} Sidebar_Group_ServersInputs */
/** @typedef {{}} Sidebar_Group_SessionsInputs */
/** @typedef {{}} Sidebar_Group_OrgInputs */
/** @typedef {{}} Sidebar_Group_Org_ShortInputs */
/** @typedef {{}} Sidebar_Item_ConversationInputs */
/** @typedef {{}} Sidebar_Item_Agent_ConfigInputs */
/** @typedef {{}} Sidebar_Item_User_PortraitInputs */
/** @typedef {{}} Sidebar_Item_Community_ProfileInputs */
/** @typedef {{}} Sidebar_Item_User_ListInputs */
/** @typedef {{}} Sidebar_Item_Assist_TasksInputs */
/** @typedef {{}} Sidebar_Item_All_SessionsInputs */
/** @typedef {{}} Sidebar_Item_Ad_ReviewInputs */
/** @typedef {{}} Sidebar_Item_Client_ChatInputs */
/** @typedef {{}} Sidebar_Item_Knowledge_BaseInputs */
/** @typedef {{}} Sidebar_Item_Daily_ReportInputs */
/** @typedef {{}} Sidebar_SettingsInputs */
/** @typedef {{}} Sidebar_Sign_OutInputs */
/** @typedef {{}} Sidebar_Not_Logged_InInputs */
/** @typedef {{}} Sidebar_Company_Not_FoundInputs */
/** @typedef {{}} Sidebar_Select_CompanyInputs */
/** @typedef {{ count: NonNullable<unknown> }} Sidebar_Servers_CountInputs */
/** @typedef {{}} Kb_TitleInputs */
/** @typedef {{}} Kb_Tab_AllInputs */
/** @typedef {{}} Kb_Tab_DocsInputs */
/** @typedef {{}} Kb_Search_PlaceholderInputs */
/** @typedef {{}} Kb_UploadInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Total_CountInputs */
/** @typedef {{}} Kb_Filter_SourceInputs */
/** @typedef {{}} Kb_EmptyInputs */
/** @typedef {{}} Kb_Pick_Company_FirstInputs */
/** @typedef {{ message: NonNullable<unknown> }} Kb_Load_ErrorInputs */
/** @typedef {{}} Kb_Menu_EditInputs */
/** @typedef {{}} Kb_Menu_DeleteInputs */
/** @typedef {{}} Kb_Source_Official_DocInputs */
/** @typedef {{}} Kb_Source_Session_RecordInputs */
/** @typedef {{}} Kb_Source_ManualInputs */
/** @typedef {{}} Kb_Unknown_TitleInputs */
/** @typedef {{}} Header_Collapse_SidebarInputs */
/** @typedef {{}} Header_Email_LoginInputs */
/** @typedef {{}} Header_Loading_AuthInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown>, total: NonNullable<unknown> }} Header_RowsInputs */
/** @typedef {{}} Header_PrevInputs */
/** @typedef {{}} Header_NextInputs */
/** @typedef {{}} Header_Open_Action_MenuInputs */
/** @typedef {{}} Header_SettingsInputs */
/** @typedef {{}} Header_User_Avatar_AltInputs */
/** @typedef {{}} Kb_Doc_TitleInputs */
/** @typedef {{}} Kb_Doc_Generated_CountInputs */
/** @typedef {{}} Kb_Doc_UploaderInputs */
/** @typedef {{}} Kb_Doc_Uploaded_AtInputs */
/** @typedef {{}} Kb_Docs_EmptyInputs */
/** @typedef {{}} Kb_Upload_Doc_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_PlaceholderInputs */
/** @typedef {{}} Kb_Upload_Doc_TodoInputs */
/** @typedef {{}} Kb_Upload_CancelInputs */
/** @typedef {{}} Kb_Upload_SubmitInputs */
/** @typedef {{}} Kb_UploadingInputs */
/** @typedef {{}} Kb_Upload_Manual_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_ClickInputs */
/** @typedef {{}} Kb_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_Missing_Document_IdInputs */
/** @typedef {{}} Kb_Upload_Doc_TimeoutInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Doc_FailedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Kb_Upload_Doc_SelectedInputs */
/** @typedef {{}} Kb_Edit_TitleInputs */
/** @typedef {{}} Kb_Edit_CloseInputs */
/** @typedef {{}} Kb_Edit_Label_TitleInputs */
/** @typedef {{}} Kb_Edit_Label_ContentInputs */
/** @typedef {{}} Kb_Edit_SaveInputs */
/** @typedef {{}} Kb_Edit_SavingInputs */
/** @typedef {{}} Kb_Edit_Missing_TargetInputs */
/** @typedef {{}} Kb_Edit_Title_RequiredInputs */
/** @typedef {{}} Kb_Edit_Content_RequiredInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Progress_StatusInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Generated_CountInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Updated_CountInputs */
/** @typedef {{ index: NonNullable<unknown> }} Kb_Result_Chunk_PrefixInputs */
/** @typedef {{ document_id: NonNullable<unknown> }} Kb_Result_EmptyInputs */
/** @typedef {{}} Kb_Result_RegenerateInputs */
/** @typedef {{}} Kb_Result_RegeneratingInputs */
/** @typedef {{}} Kb_Result_ConfirmInputs */
/** @typedef {{}} Knowledge_Doc_Processing_TimeoutInputs */
/** @typedef {{}} Knowledge_Document_Status_Load_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunk_AttemptsInputs */
/** @typedef {{}} Knowledge_Failed_Chunk_Heading_FallbackInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_EmptyInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_Select_AllInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunks_Selected_CountInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_TitleInputs */
/** @typedef {{}} Knowledge_Retry_All_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Retry_Selected_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retrying_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Upload_Progress_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_Status_CompletedInputs */
/** @typedef {{}} Knowledge_Upload_Status_FailedInputs */
/** @typedef {{}} Knowledge_Upload_Status_ProcessingInputs */
/** @typedef {{}} Knowledge_Upload_Status_UploadingInputs */
/** @typedef {{}} Onboarding_Company_Init_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Load_ErrorInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Onboarding_Company_Name_Length_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Name_LabelInputs */
/** @typedef {{}} Onboarding_Company_Name_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Description_LabelInputs */
/** @typedef {{}} Onboarding_Company_Description_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Save_ErrorInputs */
/** @typedef {{}} Onboarding_Company_SavedInputs */
/** @typedef {{}} Onboarding_Company_Setup_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Setup_TitleInputs */
/** @typedef {{}} Onboarding_Company_Submit_Create_ContinueInputs */
/** @typedef {{}} Onboarding_Company_Submit_NextInputs */
/** @typedef {{}} Onboarding_Company_Website_LabelInputs */
/** @typedef {{}} Onboarding_Company_Welcome_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Welcome_TitleInputs */
/** @typedef {{}} Onboarding_Profile_Gate_ErrorInputs */
/** @typedef {{}} Profile_Avatar_Must_Be_ImageInputs */
/** @typedef {{}} Profile_Avatar_Preview_AltInputs */
/** @typedef {{ size: NonNullable<unknown> }} Profile_Avatar_Size_LimitInputs */
/** @typedef {{}} Profile_Choose_AvatarInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Display_Name_Length_ErrorInputs */
/** @typedef {{}} Profile_Enter_NicknameInputs */
/** @typedef {{}} Profile_Init_FailedInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Nickname_HintInputs */
/** @typedef {{}} Profile_Nickname_LabelInputs */
/** @typedef {{}} Profile_Nickname_PlaceholderInputs */
/** @typedef {{}} Profile_Required_Display_NameInputs */
/** @typedef {{}} Profile_Save_ErrorInputs */
/** @typedef {{}} Profile_Save_SuccessInputs */
/** @typedef {{}} Profile_Platform_Accounts_TitleInputs */
/** @typedef {{}} Profile_Platform_Account_ConnectInputs */
/** @typedef {{}} Profile_Platform_Account_DisconnectInputs */
/** @typedef {{}} Profile_Platform_Account_UnavailableInputs */
/** @typedef {{}} Platform_DiscordInputs */
/** @typedef {{}} Platform_FeishuInputs */
/** @typedef {{}} Platform_SlackInputs */
/** @typedef {{}} Platform_TelegramInputs */
/** @typedef {{}} Platform_UnknownInputs */
/** @typedef {{}} Role_AdminInputs */
/** @typedef {{}} Role_AssistantInputs */
/** @typedef {{}} Role_BotInputs */
/** @typedef {{}} Role_LuciusInputs */
/** @typedef {{}} Role_StaffInputs */
/** @typedef {{}} Role_UnknownInputs */
/** @typedef {{}} Role_UserInputs */
/** @typedef {{}} Settings_Back_To_AppInputs */
/** @typedef {{}} Settings_Nav_Event_SettingsInputs */
/** @typedef {{}} Settings_Nav_ManagementInputs */
/** @typedef {{}} Settings_Nav_Member_ManagementInputs */
/** @typedef {{}} Settings_Nav_PackageInputs */
/** @typedef {{}} Settings_Nav_Profile_SettingsInputs */
/** @typedef {{}} Settings_Nav_Usage_HistoryInputs */
/** @typedef {{}} Settings_Nav_User_CommunitiesInputs */
/** @typedef {{}} Settings_Nav_Workgroup_SettingsInputs */
/** @typedef {{}} Settings_Select_Company_FirstInputs */
/** @typedef {{}} Settings_TitleInputs */
/** @typedef {{}} Common_AddInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Days_AgoInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_EditInputs */
/** @typedef {{}} Common_NoneInputs */
/** @typedef {{}} Common_OpenInputs */
/** @typedef {{}} Common_PreviousInputs */
/** @typedef {{}} Common_RefreshInputs */
/** @typedef {{}} Common_RefreshingInputs */
/** @typedef {{}} Common_Unknown_UserInputs */
/** @typedef {{}} Platform_WebsiteInputs */
/** @typedef {{}} Role_MemberInputs */
/** @typedef {{}} Role_OwnerInputs */
/** @typedef {{}} Workspace_Settings_TitleInputs */
/** @typedef {{}} Workspace_State_ReadyInputs */
/** @typedef {{}} Workspace_State_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_State_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_ReadyInputs */
/** @typedef {{}} Workspace_Empty_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_StaleInputs */
/** @typedef {{}} Workspace_Save_PendingInputs */
/** @typedef {{}} Workspace_BadgeInputs */
/** @typedef {{}} Workspace_RemoveInputs */
/** @typedef {{}} Workspace_SetInputs */
/** @typedef {{}} Workspace_ReadonlyInputs */
/** @typedef {{}} Workspace_Navigate_Platform_SettingsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Selected_CountInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Add_SuccessInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Remove_SuccessInputs */
/** @typedef {{}} Workspace_Select_Company_ErrorInputs */
/** @typedef {{}} Workspace_Permission_ErrorInputs */
/** @typedef {{}} Workspace_Save_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Summary_SelectedInputs */
/** @typedef {{}} Workspace_Summary_DescriptionInputs */
/** @typedef {{}} Workspace_Permission_EditableInputs */
/** @typedef {{}} Workspace_Permission_ReadonlyInputs */
/** @typedef {{}} Workspace_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Settings_TitleInputs */
/** @typedef {{}} Feishu_Default_Chat_TypeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Discovered_CandidatesInputs */
/** @typedef {{}} Feishu_No_Available_CandidatesInputs */
/** @typedef {{}} Feishu_Synced_HintInputs */
/** @typedef {{}} Feishu_Manage_HintInputs */
/** @typedef {{}} Feishu_Readonly_HintInputs */
/** @typedef {{}} Feishu_Empty_SyncedInputs */
/** @typedef {{}} Feishu_Bot_Add_ButtonInputs */
/** @typedef {{}} Feishu_Bot_Summary_Connected_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Connected_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Channels_Bound_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Channels_Bound_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_HintInputs */
/** @typedef {{}} Feishu_Bot_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_TitleInputs */
/** @typedef {{}} Feishu_Bot_Empty_Manage_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Create_TitleInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Edit_TitleInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Default_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Enabled_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HintInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_ShowInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HideInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_SubmittingInputs */
/** @typedef {{}} Feishu_Bot_CreateInputs */
/** @typedef {{}} Feishu_Bot_Default_BadgeInputs */
/** @typedef {{}} Feishu_Bot_Status_ActiveInputs */
/** @typedef {{}} Feishu_Bot_Status_DisabledInputs */
/** @typedef {{}} Feishu_Bot_Status_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Status_PendingInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyingInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartingInputs */
/** @typedef {{}} Feishu_Bot_Action_EnableInputs */
/** @typedef {{}} Feishu_Bot_Action_DisableInputs */
/** @typedef {{}} Feishu_Bot_Action_UpdatingInputs */
/** @typedef {{}} Feishu_Bot_Meta_Verified_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Connected_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Heartbeat_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Event_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_NeverInputs */
/** @typedef {{}} Feishu_Bot_Last_Error_LabelInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Assigned_Channels_CountInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_EmptyInputs */
/** @typedef {{}} Feishu_Bot_Create_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Update_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Save_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Verify_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Verify_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Enable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Enable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Restart_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Disable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Disable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_DescriptionInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_DescriptionInputs */
/** @typedef {{}} Billing_Usage_TitleInputs */
/** @typedef {{}} Billing_Current_PeriodInputs */
/** @typedef {{ key: NonNullable<unknown> }} Billing_Period_KeyInputs */
/** @typedef {{}} Billing_Period_Key_LaterInputs */
/** @typedef {{}} Billing_Used_Actions_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Blocked_ActionsInputs */
/** @typedef {{}} Billing_No_Blocked_ActionsInputs */
/** @typedef {{}} Billing_Overage_TitleInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Projected_OverageInputs */
/** @typedef {{}} Billing_No_Overage_YetInputs */
/** @typedef {{}} Billing_State_TitleInputs */
/** @typedef {{}} Billing_Estimated_Invoice_TitleInputs */
/** @typedef {{}} Billing_Auto_ChargeInputs */
/** @typedef {{}} Billing_Stop_ServiceInputs */
/** @typedef {{}} Billing_Stripe_Invoices_TitleInputs */
/** @typedef {{}} Billing_Stripe_Invoices_HintInputs */
/** @typedef {{}} Billing_Stripe_EmptyInputs */
/** @typedef {{}} Billing_Snapshot_TitleInputs */
/** @typedef {{}} Billing_Snapshot_HintInputs */
/** @typedef {{}} Billing_Snapshot_Export_TitleInputs */
/** @typedef {{}} Billing_Snapshot_ExportInputs */
/** @typedef {{}} Billing_Table_ProjectInputs */
/** @typedef {{}} Billing_Table_QuantityInputs */
/** @typedef {{}} Billing_Table_Unit_PriceInputs */
/** @typedef {{}} Billing_Table_AmountInputs */
/** @typedef {{}} Billing_Estimated_TotalInputs */
/** @typedef {{}} Billing_Period_Export_HintInputs */
/** @typedef {{}} Billing_Export_SuccessInputs */
/** @typedef {{}} Billing_Export_ErrorInputs */
/** @typedef {{}} Billing_Invoice_Status_PaidInputs */
/** @typedef {{}} Billing_Invoice_Status_OpenInputs */
/** @typedef {{}} Billing_Invoice_Status_VoidInputs */
/** @typedef {{}} Billing_Invoice_Status_UncollectibleInputs */
/** @typedef {{}} Billing_Invoice_Status_DraftInputs */
/** @typedef {{}} Billing_Invoice_Status_UnknownInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Created_OnInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Paid_OnInputs */
/** @typedef {{}} Billing_View_InvoiceInputs */
/** @typedef {{}} Billing_Download_InvoiceInputs */
/** @typedef {{}} Billing_Download_ReceiptInputs */
/** @typedef {{}} Billing_Plan_TitleInputs */
/** @typedef {{}} Billing_Display_Free_ActiveInputs */
/** @typedef {{}} Billing_Display_Free_Limit_ReachedInputs */
/** @typedef {{}} Billing_Display_Basic_TrialInputs */
/** @typedef {{}} Billing_Display_Basic_ActiveInputs */
/** @typedef {{}} Billing_Display_Basic_CancelingInputs */
/** @typedef {{}} Billing_Display_Pro_TrialInputs */
/** @typedef {{}} Billing_Display_Pro_ActiveInputs */
/** @typedef {{}} Billing_Display_Pro_CancelingInputs */
/** @typedef {{}} Billing_Display_Promo_Only_BasicInputs */
/** @typedef {{}} Billing_Display_Past_DueInputs */
/** @typedef {{}} Billing_Display_ExpiredInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Trial_Ends_OnInputs */
/** @typedef {{}} Billing_TrialingInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Ends_OnInputs */
/** @typedef {{}} Billing_Stop_After_PeriodInputs */
/** @typedef {{}} Billing_Limit_ReachedInputs */
/** @typedef {{}} Billing_Current_Period_NormalInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Next_BillingInputs */
/** @typedef {{}} Billing_Current_WorkspaceInputs */
/** @typedef {{}} Billing_Start_Basic_TrialInputs */
/** @typedef {{}} Billing_Start_Pro_TrialInputs */
/** @typedef {{}} Billing_Manage_Payment_MethodInputs */
/** @typedef {{}} Billing_Account_LabelInputs */
/** @typedef {{}} Billing_Metric_ProjectedInputs */
/** @typedef {{}} Billing_Metric_AdminsInputs */
/** @typedef {{}} Billing_Metric_PlatformsInputs */
/** @typedef {{}} Billing_Metric_OverageInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Monthly_PriceInputs */
/** @typedef {{}} Billing_Actions_LabelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Actions_Included_MonthInputs */
/** @typedef {{ count: NonNullable<unknown>, amount: NonNullable<unknown> }} Billing_Overage_SummaryInputs */
/** @typedef {{}} Billing_No_Overage_FeeInputs */
/** @typedef {{ percent: NonNullable<unknown> }} Billing_Usage_RateInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_AdminInputs */
/** @typedef {{}} Billing_No_Extra_AdminInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_PlatformInputs */
/** @typedef {{}} Billing_No_Extra_PlatformInputs */
/** @typedef {{}} Billing_Overage_Policy_TitleInputs */
/** @typedef {{}} Billing_Overage_Policy_SubtitleInputs */
/** @typedef {{}} Billing_Free_Fixed_Stop_ServiceInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_TitleInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_DescInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_TitleInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_DescInputs */
/** @typedef {{}} Billing_Monthly_Overage_CapInputs */
/** @typedef {{}} Billing_Example_CapInputs */
/** @typedef {{}} Billing_Save_PolicyInputs */
/** @typedef {{}} Billing_Current_PlanInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Overage_Per_ActionInputs */
/** @typedef {{}} Billing_UnsupportedInputs */
/** @typedef {{ platform: NonNullable<unknown>, admin: NonNullable<unknown> }} Billing_Addon_SummaryInputs */
/** @typedef {{}} Billing_Start_TrialInputs */
/** @typedef {{}} Member_Management_TitleInputs */
/** @typedef {{}} Member_Management_Add_MemberInputs */
/** @typedef {{}} Member_Management_Table_IdInputs */
/** @typedef {{}} Member_Management_Table_PlatformsInputs */
/** @typedef {{}} Member_Management_Table_RoleInputs */
/** @typedef {{}} Member_Management_Table_Recent_ActivityInputs */
/** @typedef {{}} Member_Management_Table_ActionsInputs */
/** @typedef {{}} Member_Management_Remove_Current_UserInputs */
/** @typedef {{}} Member_Management_Remove_OwnerInputs */
/** @typedef {{}} Member_Management_Admin_Cancel_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Remove_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Owner_Only_ActionInputs */
/** @typedef {{}} Member_Management_Menu_Hint_Current_AccountInputs */
/** @typedef {{}} Member_Management_Menu_Hint_OwnerInputs */
/** @typedef {{}} Member_Management_Menu_Hint_No_PermissionInputs */
/** @typedef {{}} Member_Management_Update_Current_User_RoleInputs */
/** @typedef {{}} Member_Management_Update_Owner_RoleInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Status_InvitedInputs */
/** @typedef {{}} Member_Management_Status_JoinedInputs */
/** @typedef {{}} Member_Management_Recent_Pending_JoinInputs */
/** @typedef {{}} Member_Management_Recent_UnrecordedInputs */
/** @typedef {{}} Member_Management_Fallback_NameInputs */
/** @typedef {{}} Member_Management_Invalid_EmailInputs */
/** @typedef {{}} Member_Management_Invite_ErrorInputs */
/** @typedef {{}} Member_Management_Role_Update_ErrorInputs */
/** @typedef {{}} Member_Management_Resend_ErrorInputs */
/** @typedef {{}} Member_Management_Link_Telegram_ErrorInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_BindInputs */
/** @typedef {{}} Member_Management_Link_Platform_ErrorInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_BoundInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_Bind_FailedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_UnlinkedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Oauth_Link_HintInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_UnbindInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_Platform_ErrorInputs */
/** @typedef {{}} Member_Management_Cancel_InviteInputs */
/** @typedef {{}} Member_Management_Remove_MemberInputs */
/** @typedef {{}} Member_Management_Actions_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Management_Actions_Menu_AriaInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Member_Management_Accounts_LabelInputs */
/** @typedef {{}} Member_Management_UnlinkedInputs */
/** @typedef {{}} Member_Management_Adjust_Invite_RoleInputs */
/** @typedef {{}} Member_Management_Change_RoleInputs */
/** @typedef {{}} Member_Management_Resending_InviteInputs */
/** @typedef {{}} Member_Management_Resend_InviteInputs */
/** @typedef {{}} Member_Management_My_BindingsInputs */
/** @typedef {{}} Member_Management_No_Current_MemberInputs */
/** @typedef {{}} Member_Management_Linked_PlatformsInputs */
/** @typedef {{}} Member_Management_Telegram_LinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnlinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnavailableInputs */
/** @typedef {{}} Member_Management_UnlinkingInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_PlatformInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Login_And_LinkInputs */
/** @typedef {{}} Member_Management_LinkingInputs */
/** @typedef {{}} Member_Management_Binding_WaitInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_TitleInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Mode_EmailInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Mode_Link_HintInputs */
/** @typedef {{}} Member_Management_Email_LabelInputs */
/** @typedef {{}} Member_Management_Role_LabelInputs */
/** @typedef {{}} Member_Management_Role_PlaceholderInputs */
/** @typedef {{}} Member_Management_Generate_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_GeneratingInputs */
/** @typedef {{}} Member_Management_Copy_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Link_CopiedInputs */
/** @typedef {{}} Member_Management_Invite_Link_ErrorInputs */
/** @typedef {{}} Member_Management_Invite_Link_Copy_FailedInputs */
/** @typedef {{}} Member_Management_Send_InviteInputs */
/** @typedef {{}} Member_Management_Sending_InviteInputs */
/** @typedef {{ email: NonNullable<unknown>, role: NonNullable<unknown> }} Member_Management_Role_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Role_Dialog_Empty_DescInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_UpdateInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_InviteInputs */
/** @typedef {{}} Member_Management_Admin_Quota_HintInputs */
/** @typedef {{ name: NonNullable<unknown> }} Member_Management_Avatar_AltInputs */
/** @typedef {{}} Member_Management_Save_RoleInputs */
/** @typedef {{}} Member_Invite_Invalid_TitleInputs */
/** @typedef {{}} Member_Invite_Invalid_DescInputs */
/** @typedef {{}} Member_Invite_Switch_Account_ErrorInputs */
/** @typedef {{}} Member_Invite_Accept_ErrorInputs */
/** @typedef {{}} Member_Invite_BadgeInputs */
/** @typedef {{ role: NonNullable<unknown> }} Member_Invite_SummaryInputs */
/** @typedef {{}} Member_Invite_Role_LabelInputs */
/** @typedef {{}} Member_Invite_Expiry_LabelInputs */
/** @typedef {{}} Member_Invite_Status_LabelInputs */
/** @typedef {{}} Member_Invite_Joined_TitleInputs */
/** @typedef {{}} Member_Invite_Joined_DescInputs */
/** @typedef {{}} Member_Invite_Joined_BadgeInputs */
/** @typedef {{}} Member_Invite_Expired_TitleInputs */
/** @typedef {{}} Member_Invite_Expired_DescInputs */
/** @typedef {{}} Member_Invite_Cancelled_TitleInputs */
/** @typedef {{}} Member_Invite_Cancelled_DescInputs */
/** @typedef {{}} Member_Invite_Used_TitleInputs */
/** @typedef {{}} Member_Invite_Used_DescInputs */
/** @typedef {{}} Member_Invite_Email_Mismatch_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Invite_Email_Mismatch_DescInputs */
/** @typedef {{}} Member_Invite_Ready_TitleInputs */
/** @typedef {{}} Member_Invite_Ready_DescInputs */
/** @typedef {{}} Member_Invite_Login_TitleInputs */
/** @typedef {{}} Member_Invite_Login_DescInputs */
/** @typedef {{}} Member_Invite_Open_WorkspaceInputs */
/** @typedef {{}} Member_Invite_Switching_AccountInputs */
/** @typedef {{}} Member_Invite_Switch_AccountInputs */
/** @typedef {{}} Member_Invite_AcceptingInputs */
/** @typedef {{}} Member_Invite_Accept_ActionInputs */
/** @typedef {{}} Member_Invite_Login_ActionInputs */
/** @typedef {{}} Member_Invite_Back_DashboardInputs */
/** @typedef {{}} Telegram_Widget_Load_ErrorInputs */
/** @typedef {{}} Telegram_Settings_GroupInputs */
/** @typedef {{}} Telegram_Settings_SupergroupInputs */
/** @typedef {{}} Telegram_Settings_ChannelInputs */
/** @typedef {{}} Telegram_Settings_PrivateInputs */
/** @typedef {{}} Telegram_Settings_UnknownInputs */
/** @typedef {{}} Telegram_Settings_Status_PendingInputs */
/** @typedef {{}} Telegram_Settings_Status_FulfilledInputs */
/** @typedef {{}} Telegram_Settings_Status_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Status_CancelledInputs */
/** @typedef {{}} Telegram_Settings_Status_FailedInputs */
/** @typedef {{}} Telegram_Settings_Load_Config_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Bound_Channels_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Candidates_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Session_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_TopInputs */
/** @typedef {{}} Telegram_Settings_Login_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Create_Session_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Create_Binding_Intent_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Auto_Bind_Success_NamedInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_IncompleteInputs */
/** @typedef {{}} Telegram_Settings_Poll_Status_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_ConfirmInputs */
/** @typedef {{}} Telegram_Settings_Login_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_Add_BotInputs */
/** @typedef {{}} Telegram_Settings_Add_CommunityInputs */
/** @typedef {{}} Telegram_Settings_Empty_With_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Empty_Without_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Dialog_TitleInputs */
/** @typedef {{}} Telegram_Settings_Step_LoginInputs */
/** @typedef {{}} Telegram_Settings_LoginInputs */
/** @typedef {{}} Telegram_Settings_Logging_InInputs */
/** @typedef {{}} Telegram_Settings_Integration_DisabledInputs */
/** @typedef {{}} Telegram_Settings_Verifying_LoginInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_NameInputs */
/** @typedef {{ name: NonNullable<unknown>, username: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_UsernameInputs */
/** @typedef {{}} Telegram_Settings_Step_Add_BotInputs */
/** @typedef {{ username: NonNullable<unknown> }} Telegram_Settings_Add_Bot_ButtonInputs */
/** @typedef {{}} Telegram_Settings_Step_Sync_CommunitiesInputs */
/** @typedef {{}} Telegram_Settings_Refresh_CommunitiesInputs */
/** @typedef {{}} Event_Settings_TitleInputs */
/** @typedef {{}} Event_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Event_Settings_Add_TypeInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_OwnerInputs */
/** @typedef {{}} Event_Settings_Trigger_Owner_UnboundInputs */
/** @typedef {{}} Event_Settings_Trigger_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_ChannelInputs */
/** @typedef {{}} Event_Settings_Back_To_ListInputs */
/** @typedef {{}} Event_Settings_Detail_Title_NewInputs */
/** @typedef {{ name: NonNullable<unknown> }} Event_Settings_Detail_Title_ExistingInputs */
/** @typedef {{}} Event_Settings_Detail_Title_DefaultInputs */
/** @typedef {{}} Event_Settings_Type_Not_FoundInputs */
/** @typedef {{}} Event_Settings_Label_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Label_Type_NameInputs */
/** @typedef {{}} Event_Settings_Label_Type_DescriptionInputs */
/** @typedef {{}} Event_Settings_Label_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Select_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Member_List_LabelInputs */
/** @typedef {{}} Event_Settings_No_MembersInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Event_Settings_Bound_AccountsInputs */
/** @typedef {{}} Event_Settings_Unbound_AccountsInputs */
/** @typedef {{}} Event_Settings_Label_Platform_ChannelsInputs */
/** @typedef {{}} Event_Settings_Platform_Channel_ListInputs */
/** @typedef {{}} Event_Settings_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Label_Send_NotificationInputs */
/** @typedef {{}} Event_Settings_Notify_Disabled_HintInputs */
/** @typedef {{}} Event_Settings_Notification_TargetsInputs */
/** @typedef {{}} Event_Settings_Notification_Targets_EmptyInputs */
/** @typedef {{}} Event_Settings_List_TitleInputs */
/** @typedef {{}} Event_Settings_List_EmptyInputs */
/** @typedef {{}} Event_Settings_System_BadgeInputs */
/** @typedef {{}} Event_Settings_Unnamed_TypeInputs */
/** @typedef {{}} Event_Type_Label_Exception_IssueInputs */
/** @typedef {{}} Event_Type_Label_Usage_IssueInputs */
/** @typedef {{}} Event_Type_Label_Order_IssueInputs */
/** @typedef {{}} Event_Type_Label_Business_CooperationInputs */
/** @typedef {{}} Event_Type_Label_Product_FeedbackInputs */
/** @typedef {{}} Event_Type_Label_Unrecognized_InformationInputs */
/** @typedef {{}} Event_Type_Label_AdvertisementInputs */
/** @typedef {{}} Event_Type_Label_Message_DeletionInputs */
/** @typedef {{}} Event_Settings_Read_Members_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Bindings_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Notification_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_Invalid_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Type_Name_RequiredInputs */
/** @typedef {{}} Event_Settings_Missing_Type_Config_MigrationInputs */
/** @typedef {{}} Event_Settings_Save_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Missing_Saved_Config_IdInputs */
/** @typedef {{}} Event_Settings_Members_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Channels_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Clear_Targets_ErrorInputs */
/** @typedef {{}} Event_Settings_Write_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_SavedInputs */
/** @typedef {{}} Event_Settings_Save_ErrorInputs */
/** @typedef {{}} Event_Settings_Notify_OffInputs */
/** @typedef {{}} Event_Settings_Notify_OnInputs */
/** @typedef {{}} Integration_Status_Not_ConnectedInputs */
/** @typedef {{}} Integration_Status_Degraded_RetryInputs */
/** @typedef {{}} Integration_Status_ConnectedInputs */
/** @typedef {{}} Integration_Status_DisabledInputs */
/** @typedef {{}} Integration_Sync_SuccessInputs */
/** @typedef {{ channels: NonNullable<unknown>, roles: NonNullable<unknown> }} Integration_Sync_Success_Channels_RolesInputs */
/** @typedef {{ channels: NonNullable<unknown> }} Integration_Sync_Success_ChannelsInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_SuccessInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_DegradedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Create_Install_ErrorInputs */
/** @typedef {{}} Integration_Manual_Sync_ErrorInputs */
/** @typedef {{}} Integration_Owner_Admin_OnlyInputs */
/** @typedef {{}} Integration_Add_CommunityInputs */
/** @typedef {{}} Integration_Empty_With_CompanyInputs */
/** @typedef {{}} Integration_Empty_Without_CompanyInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Dialog_TitleInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Step_ConnectInputs */
/** @typedef {{}} Integration_Step_SyncInputs */
/** @typedef {{}} Integration_Step_RefreshInputs */
/** @typedef {{}} Integration_Creating_Install_LinkInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ReconnectInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ConnectInputs */
/** @typedef {{}} Integration_SyncingInputs */
/** @typedef {{}} Integration_Manual_SyncInputs */
/** @typedef {{}} Integration_Refresh_CommunitiesInputs */
/** @typedef {{}} Discord_Channel_TextInputs */
/** @typedef {{}} Discord_Channel_VoiceInputs */
/** @typedef {{}} Discord_Channel_CategoryInputs */
/** @typedef {{}} Discord_Channel_AnnouncementInputs */
/** @typedef {{}} Discord_Channel_StageInputs */
/** @typedef {{}} Discord_Channel_ForumInputs */
/** @typedef {{}} Discord_Channel_DefaultInputs */
/** @typedef {{}} Slack_Channel_PrivateInputs */
/** @typedef {{}} Slack_Channel_PublicInputs */
/** @typedef {{}} Slack_Channel_Direct_MessageInputs */
/** @typedef {{}} Slack_Channel_Multi_Person_DmInputs */
/** @typedef {{}} Slack_Channel_GroupInputs */
/** @typedef {{}} Slack_Channel_DefaultInputs */
/** @typedef {{}} Settings_Remove_Member_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Knowledge_Upload_CompletedInputs */
/** @typedef {{ url: NonNullable<unknown> }} Knowledge_Web_Crawl_CompletedInputs */
/** @typedef {{}} Knowledge_Close_Result_PanelInputs */
/** @typedef {{}} Knowledge_Close_Detail_PopupInputs */
/** @typedef {{}} Knowledge_Close_Document_PopupInputs */
/** @typedef {{}} Knowledge_Chunk_ListInputs */
/** @typedef {{}} Knowledge_Close_Image_PreviewInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_ActionInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_Desc_PrefixInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_TitleInputs */
/** @typedef {{}} Knowledge_Delete_FailedInputs */
/** @typedef {{}} Knowledge_DeletingInputs */
/** @typedef {{}} Knowledge_Doc_Insight_TitleInputs */
/** @typedef {{}} Knowledge_Doc_TitleInputs */
/** @typedef {{}} Knowledge_Generated_CountInputs */
/** @typedef {{}} Knowledge_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_Image_Preview_HintInputs */
/** @typedef {{}} Knowledge_Load_Attachments_FailedInputs */
/** @typedef {{}} Knowledge_Load_Chunks_FailedInputs */
/** @typedef {{}} Knowledge_Manual_Knowledge_PrefixInputs */
/** @typedef {{}} Knowledge_No_Chunk_DataInputs */
/** @typedef {{}} Knowledge_No_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_No_Source_Document_UrlInputs */
/** @typedef {{}} Knowledge_PreviewInputs */
/** @typedef {{}} Knowledge_Role_AssistantInputs */
/** @typedef {{}} Knowledge_Role_UserInputs */
/** @typedef {{}} Knowledge_Search_PlaceholderInputs */
/** @typedef {{}} Knowledge_Session_Not_FoundInputs */
/** @typedef {{}} Knowledge_Source_FilterInputs */
/** @typedef {{}} Knowledge_Source_ManualInputs */
/** @typedef {{}} Knowledge_Source_Official_DocInputs */
/** @typedef {{}} Knowledge_Source_Web_CrawlInputs */
/** @typedef {{}} Knowledge_Source_Session_RecordInputs */
/** @typedef {{}} Knowledge_Source_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_HintInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Depth_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Pages_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_TabInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_PlaceholderInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_RequiredInputs */
/** @typedef {{}} Knowledge_Tab_DocsInputs */
/** @typedef {{}} Knowledge_Tab_ItemsInputs */
/** @typedef {{}} Knowledge_Total_Count_PrefixInputs */
/** @typedef {{}} Knowledge_Total_Count_SuffixInputs */
/** @typedef {{}} Knowledge_Total_PrefixInputs */
/** @typedef {{}} Knowledge_Type_SizeInputs */
/** @typedef {{}} Knowledge_Upload_Dialog_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Doc_ClickInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_TabInputs */
/** @typedef {{}} Knowledge_Upload_KnowledgeInputs */
/** @typedef {{}} Knowledge_Upload_Manual_TabInputs */
/** @typedef {{}} Knowledge_Upload_Selected_Files_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Selected_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_SubmitInputs */
/** @typedef {{}} Knowledge_UploaderInputs */
/** @typedef {{}} Knowledge_Uploaded_AtInputs */
/** @typedef {{}} Knowledge_UploadingInputs */
/** @typedef {{}} Knowledge_View_DocumentInputs */
/** @typedef {{}} Knowledge_View_SourceInputs */
/** @typedef {{}} Session_Unknown_ChannelInputs */
/** @typedef {{}} App_Logo_AltInputs */
/** @typedef {{}} Onboarding_Company_Website_PlaceholderInputs */
/** @typedef {{}} Member_Management_Email_PlaceholderInputs */
/** @typedef {{}} Service_Login_RequiredInputs */
/** @typedef {{}} Service_Company_Update_Permission_DeniedInputs */
/** @typedef {{}} Service_Company_Not_FoundInputs */
/** @typedef {{}} Service_Company_Name_RequiredInputs */
/** @typedef {{}} Service_Workspace_Create_FailedInputs */
/** @typedef {{}} Service_Workspace_Create_Missing_Company_IdInputs */
/** @typedef {{}} Service_Avatar_Public_Url_MissingInputs */
/** @typedef {{}} Service_Profile_Name_ConflictInputs */
/** @typedef {{}} Service_Profile_Member_InactiveInputs */
/** @typedef {{}} Service_Discord_Request_FailedInputs */
/** @typedef {{}} Service_Slack_Request_FailedInputs */
/** @typedef {{}} Service_Telegram_Request_FailedInputs */
/** @typedef {{}} Service_Feishu_Channels_Read_FailedInputs */
/** @typedef {{}} Service_Member_Management_Request_FailedInputs */
/** @typedef {{}} Service_Member_Activity_Report_FailedInputs */
/** @typedef {{}} Service_Event_Action_Request_FailedInputs */
/** @typedef {{}} Service_Billing_Request_FailedInputs */
/** @typedef {{}} Service_Client_Chat_Request_FailedInputs */
/** @typedef {{}} Service_Workgroup_Table_MissingInputs */
/** @typedef {{}} Service_Workgroup_Fetch_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_IncompleteInputs */
/** @typedef {{}} Service_Workgroup_Delete_FailedInputs */
/** @typedef {{}} Service_Event_Query_Schema_Not_ExposedInputs */
/** @typedef {{ schemaName: NonNullable<unknown> }} Service_Event_Query_Schema_Permission_DeniedInputs */
/** @typedef {{}} Service_Event_Query_FailedInputs */
/** @typedef {{}} Service_Event_Detail_Request_FailedInputs */
/** @typedef {{}} Service_Event_Query_Empty_ContentInputs */
/** @typedef {{}} Common_Lucius_Ai_NameInputs */
/** @typedef {{}} Workgroup_Meta_SupergroupInputs */
/** @typedef {{}} Workgroup_Channel_Missing_From_PlatformInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_SelectedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_AvailableInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_Saved_Needs_ConnectionInputs */
/** @typedef {{}} Workgroup_Summary_UnavailableInputs */
/** @typedef {{}} Workgroup_Summary_Needs_ConnectionInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workgroup_Helper_Connected_NamedInputs */
/** @typedef {{}} Workgroup_Discord_ReadyInputs */
/** @typedef {{}} Workgroup_Discord_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Discord_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Discord_Status_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_ReadyInputs */
/** @typedef {{}} Workgroup_Slack_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Slack_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_Status_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Telegram_ReadyInputs */
/** @typedef {{}} Workgroup_Telegram_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Telegram_Channels_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Feishu_ReadyInputs */
/** @typedef {{}} Workgroup_Feishu_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Feishu_Channels_Read_FailedInputs */
/** @typedef {{ status: NonNullable<unknown> }} Knowledge_Session_Load_FailedInputs */
/** @typedef {{}} Billing_Plan_Name_FreeInputs */
/** @typedef {{}} Billing_Plan_Name_BasicInputs */
/** @typedef {{}} Billing_Plan_Name_ProInputs */
/** @typedef {{}} Billing_Export_Base_Plan_LabelInputs */
/** @typedef {{ planName: NonNullable<unknown> }} Billing_Export_Base_Plan_DescriptionInputs */
/** @typedef {{}} Billing_Export_Base_Plan_QuantityInputs */
/** @typedef {{}} Billing_Export_Included_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Included_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Used_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_OverInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_IncludedInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_DescInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_DescInputs */
/** @typedef {{}} Billing_Export_Overage_Actions_LabelInputs */
/** @typedef {{ mode: NonNullable<unknown> }} Billing_Export_Overage_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_StopInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_CapInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_ActionsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_AdminsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_PlatformsInputs */
/** @typedef {{}} Billing_Export_Csv_Account_IdInputs */
/** @typedef {{}} Billing_Export_Csv_Period_KeyInputs */
/** @typedef {{}} Billing_Export_Csv_Period_StartInputs */
/** @typedef {{}} Billing_Export_Csv_Period_EndInputs */
/** @typedef {{}} Billing_Export_Csv_PlanInputs */
/** @typedef {{}} Billing_Export_Csv_Overage_PolicyInputs */
/** @typedef {{}} Billing_Export_Csv_Projected_TotalInputs */
/** @typedef {{}} Billing_Export_Csv_CategoryInputs */
/** @typedef {{}} Billing_Export_Csv_DescriptionInputs */
/** @typedef {{}} Billing_Export_Csv_ChargeInputs */
/** @typedef {{}} Billing_Export_Csv_InfoInputs */
/** @typedef {{}} Billing_Export_Csv_Estimated_TotalInputs */
/** @typedef {{}} Cp_Page_TitleInputs */
/** @typedef {{}} Cp_Filter_CommunityInputs */
/** @typedef {{}} Cp_Filter_TimeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Cp_All_CommunitiesInputs */
/** @typedef {{}} Cp_Time_7dInputs */
/** @typedef {{}} Cp_Time_14dInputs */
/** @typedef {{}} Cp_Time_30dInputs */
/** @typedef {{}} Cp_Section_MetricsInputs */
/** @typedef {{}} Cp_Total_UsersInputs */
/** @typedef {{}} Cp_Total_Users_HelperInputs */
/** @typedef {{}} Cp_New_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_New_Users_HelperInputs */
/** @typedef {{}} Cp_Active_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_Active_Users_HelperInputs */
/** @typedef {{}} Cp_Section_TrendsInputs */
/** @typedef {{}} Cp_Chart_Total_UsersInputs */
/** @typedef {{}} Cp_Chart_New_UsersInputs */
/** @typedef {{}} Cp_Chart_Active_UsersInputs */
/** @typedef {{}} Cp_No_Chart_DataInputs */
/** @typedef {{}} Ul_Page_TitleInputs */
/** @typedef {{}} Ul_No_DataInputs */
/** @typedef {{}} Ul_Platform_AllInputs */
/** @typedef {{}} Ul_Active_AllInputs */
/** @typedef {{}} Ul_Active_7dInputs */
/** @typedef {{}} Ul_Active_30dInputs */
/** @typedef {{}} Ul_Active_90dInputs */
/** @typedef {{}} Ul_Sort_Last_ActiveInputs */
/** @typedef {{}} Ul_Sort_Total_MessagesInputs */
/** @typedef {{}} Ul_Sort_Last_SummaryInputs */
/** @typedef {{}} Ul_Sort_Last_UpdatedInputs */
/** @typedef {{}} Ul_Sort_Created_AtInputs */
/** @typedef {{}} Ul_Sort_UsernameInputs */
/** @typedef {{}} Ul_Order_DescInputs */
/** @typedef {{}} Ul_Order_AscInputs */
/** @typedef {{}} Ul_Search_PlaceholderInputs */
/** @typedef {{}} Ul_Clear_FiltersInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_UsersInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown> }} Ul_Showing_RangeInputs */
/** @typedef {{}} Ul_UpdatingInputs */
/** @typedef {{}} Ul_Pick_Company_FirstInputs */
/** @typedef {{}} Ul_Load_ErrorInputs */
/** @typedef {{}} Ul_Col_UserInputs */
/** @typedef {{}} Ul_Col_PlatformInputs */
/** @typedef {{}} Ul_Col_Total_MessagesInputs */
/** @typedef {{}} Ul_Col_First_InteractionInputs */
/** @typedef {{}} Ul_Col_Last_ActiveInputs */
/** @typedef {{}} Ul_Col_ProfileInputs */
/** @typedef {{}} Ul_Col_TagsInputs */
/** @typedef {{}} Ul_All_TagsInputs */
/** @typedef {{}} Ul_No_TagsInputs */
/** @typedef {{}} Ul_Min_MessagesInputs */
/** @typedef {{}} Ul_Sort_FieldInputs */
/** @typedef {{}} Ul_Sort_OrderInputs */
/** @typedef {{}} Ul_No_ProfileInputs */
/** @typedef {{}} Ul_Empty_ResultsInputs */
/** @typedef {{}} Ul_Detail_TitleInputs */
/** @typedef {{}} Ul_Close_DetailInputs */
/** @typedef {{}} Ul_Detail_First_InteractionInputs */
/** @typedef {{}} Ul_Detail_First_Interaction_HelperInputs */
/** @typedef {{}} Ul_Detail_Last_ActiveInputs */
/** @typedef {{}} Ul_Detail_Last_Active_HelperInputs */
/** @typedef {{}} Ul_Detail_ProfileInputs */
/** @typedef {{}} Ul_Detail_Profile_ExpandInputs */
/** @typedef {{}} Ul_Detail_Profile_CollapseInputs */
/** @typedef {{}} Ul_Detail_TagsInputs */
/** @typedef {{}} Ul_Detail_No_ReasonInputs */
/** @typedef {{}} Ul_Trend_Messages_TitleInputs */
/** @typedef {{}} Ul_Trend_Messages_DescInputs */
/** @typedef {{}} Ul_Trend_Active_TitleInputs */
/** @typedef {{}} Ul_Trend_Active_DescInputs */
/** @typedef {{}} Ul_Chat_RecordsInputs */
/** @typedef {{}} Ul_Loading_MessagesInputs */
/** @typedef {{}} Ul_Load_Messages_ErrorInputs */
/** @typedef {{}} Ul_No_MessagesInputs */
/** @typedef {{}} Ul_Empty_MessageInputs */
/** @typedef {{ channelId: NonNullable<unknown> }} Ul_ChannelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_Messages_CountInputs */
/** @typedef {{}} Ul_Loading_DetailInputs */
/** @typedef {{}} Ul_Loading_Detail_DescInputs */
/** @typedef {{}} Ul_Detail_Load_ErrorInputs */
/** @typedef {{}} Ul_Retry_LaterInputs */
/** @typedef {{}} Ul_Tag_Manage_ButtonInputs */
/** @typedef {{}} Ul_Tag_Manage_TitleInputs */
/** @typedef {{}} Ul_Tag_Manage_DescInputs */
/** @typedef {{}} Ul_Tag_ExistingInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Tag_CountInputs */
/** @typedef {{}} Ul_Tag_LoadingInputs */
/** @typedef {{}} Ul_Tag_Load_ErrorInputs */
/** @typedef {{}} Ul_Tag_EmptyInputs */
/** @typedef {{}} Ul_Tag_Status_ActiveInputs */
/** @typedef {{}} Ul_Tag_Status_InactiveInputs */
/** @typedef {{}} Ul_Tag_Toggle_LabelInputs */
/** @typedef {{}} Ul_Tag_No_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Create_TitleInputs */
/** @typedef {{}} Ul_Tag_Create_DescInputs */
/** @typedef {{}} Ul_Tag_Form_NameInputs */
/** @typedef {{}} Ul_Tag_Form_Name_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Form_Name_RequiredInputs */
/** @typedef {{}} Ul_Tag_Form_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Form_Description_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Create_ButtonInputs */
/** @typedef {{}} Ul_Tag_Create_LoadingInputs */
/** @typedef {{}} Ul_Tag_Create_SuccessInputs */
/** @typedef {{}} Ul_Tag_Create_ErrorInputs */
/** @typedef {{}} Ul_Tag_Update_ErrorInputs */
/** @typedef {{}} Ul_Tag_Enable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Disable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ButtonInputs */
/** @typedef {{}} Ul_Tag_Init_LoadingInputs */
/** @typedef {{}} Ul_Tag_Init_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ErrorInputs */
import * as __en from "./en.js"
import * as __zh from "./zh.js"
/**
* | output |
* | --- |
* | "An autonomous AI teammate that learns from your community and works with your team, just like a real human would." |
*
* @param {App_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_description = /** @type {((inputs?: App_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.app_description(inputs)
	return __zh.app_description(inputs)
});
/**
* | output |
* | --- |
* | "Lucius AI" |
*
* @param {App_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_title = /** @type {((inputs?: App_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.app_title(inputs)
	return __zh.app_title(inputs)
});
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Auth_BackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_back = /** @type {((inputs?: Auth_BackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_BackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_back(inputs)
	return __zh.auth_back(inputs)
});
/**
* | output |
* | --- |
* | "Callback failed: {message}" |
*
* @param {Auth_Callback_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_failed = /** @type {((inputs: Auth_Callback_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_callback_failed(inputs)
	return __zh.auth_callback_failed(inputs)
});
/**
* | output |
* | --- |
* | "Email link is invalid or has expired" |
*
* @param {Auth_Callback_Invalid_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_invalid_link = /** @type {((inputs?: Auth_Callback_Invalid_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Invalid_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_callback_invalid_link(inputs)
	return __zh.auth_callback_invalid_link(inputs)
});
/**
* | output |
* | --- |
* | "No session was found. Please request a new magic link." |
*
* @param {Auth_Callback_Missing_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_missing_session = /** @type {((inputs?: Auth_Callback_Missing_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Missing_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_callback_missing_session(inputs)
	return __zh.auth_callback_missing_session(inputs)
});
/**
* | output |
* | --- |
* | "Unknown callback error" |
*
* @param {Auth_Callback_Unknown_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_unknown_error = /** @type {((inputs?: Auth_Callback_Unknown_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Unknown_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_callback_unknown_error(inputs)
	return __zh.auth_callback_unknown_error(inputs)
});
/**
* | output |
* | --- |
* | "Email address" |
*
* @param {Auth_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_label = /** @type {((inputs?: Auth_Email_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email_label(inputs)
	return __zh.auth_email_label(inputs)
});
/**
* | output |
* | --- |
* | "Email Login" |
*
* @param {Auth_Email_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_login = /** @type {((inputs?: Auth_Email_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email_login(inputs)
	return __zh.auth_email_login(inputs)
});
/**
* | output |
* | --- |
* | "Email sign-in failed: {message}" |
*
* @param {Auth_Email_Login_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_login_failed = /** @type {((inputs: Auth_Email_Login_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_Login_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email_login_failed(inputs)
	return __zh.auth_email_login_failed(inputs)
});
/**
* | output |
* | --- |
* | "Enter your email address" |
*
* @param {Auth_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_placeholder = /** @type {((inputs?: Auth_Email_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email_placeholder(inputs)
	return __zh.auth_email_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Please enter your email address." |
*
* @param {Auth_Email_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_required = /** @type {((inputs?: Auth_Email_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email_required(inputs)
	return __zh.auth_email_required(inputs)
});
/**
* | output |
* | --- |
* | "Get sign-in link" |
*
* @param {Auth_Get_Magic_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_get_magic_link = /** @type {((inputs?: Auth_Get_Magic_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Get_Magic_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_get_magic_link(inputs)
	return __zh.auth_get_magic_link(inputs)
});
/**
* | output |
* | --- |
* | "Sign up / Log in" |
*
* @param {Auth_Login_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_title = /** @type {((inputs?: Auth_Login_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_login_title(inputs)
	return __zh.auth_login_title(inputs)
});
/**
* | output |
* | --- |
* | "Continue with GitHub" |
*
* @param {Auth_Login_With_GithubInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_with_github = /** @type {((inputs?: Auth_Login_With_GithubInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_With_GithubInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_login_with_github(inputs)
	return __zh.auth_login_with_github(inputs)
});
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Auth_Login_With_GoogleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_with_google = /** @type {((inputs?: Auth_Login_With_GoogleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_With_GoogleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_login_with_google(inputs)
	return __zh.auth_login_with_google(inputs)
});
/**
* | output |
* | --- |
* | "Click the link in the email to sign in." |
*
* @param {Auth_Magic_Link_Sent_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_magic_link_sent_hint = /** @type {((inputs?: Auth_Magic_Link_Sent_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Magic_Link_Sent_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_magic_link_sent_hint(inputs)
	return __zh.auth_magic_link_sent_hint(inputs)
});
/**
* | output |
* | --- |
* | "Email sent to: {email}" |
*
* @param {Auth_Magic_Link_Sent_ToInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_magic_link_sent_to = /** @type {((inputs: Auth_Magic_Link_Sent_ToInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Magic_Link_Sent_ToInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_magic_link_sent_to(inputs)
	return __zh.auth_magic_link_sent_to(inputs)
});
/**
* | output |
* | --- |
* | "Or" |
*
* @param {Auth_OrInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_or = /** @type {((inputs?: Auth_OrInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_OrInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_or(inputs)
	return __zh.auth_or(inputs)
});
/**
* | output |
* | --- |
* | "GitHub" |
*
* @param {Auth_Provider_GithubInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_provider_github = /** @type {((inputs?: Auth_Provider_GithubInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Provider_GithubInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_provider_github(inputs)
	return __zh.auth_provider_github(inputs)
});
/**
* | output |
* | --- |
* | "Google" |
*
* @param {Auth_Provider_GoogleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_provider_google = /** @type {((inputs?: Auth_Provider_GoogleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Provider_GoogleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_provider_google(inputs)
	return __zh.auth_provider_google(inputs)
});
/**
* | output |
* | --- |
* | "{provider} sign-in failed: {message}" |
*
* @param {Auth_Provider_Login_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_provider_login_failed = /** @type {((inputs: Auth_Provider_Login_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Provider_Login_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_provider_login_failed(inputs)
	return __zh.auth_provider_login_failed(inputs)
});
/**
* | output |
* | --- |
* | "Resend" |
*
* @param {Auth_ResendInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend = /** @type {((inputs?: Auth_ResendInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_ResendInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_resend(inputs)
	return __zh.auth_resend(inputs)
});
/**
* | output |
* | --- |
* | "Resend ({seconds}s)" |
*
* @param {Auth_Resend_CountdownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend_countdown = /** @type {((inputs: Auth_Resend_CountdownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Resend_CountdownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_resend_countdown(inputs)
	return __zh.auth_resend_countdown(inputs)
});
/**
* | output |
* | --- |
* | "Failed to resend email: {message}" |
*
* @param {Auth_Resend_Email_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend_email_failed = /** @type {((inputs: Auth_Resend_Email_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Resend_Email_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_resend_email_failed(inputs)
	return __zh.auth_resend_email_failed(inputs)
});
/**
* | output |
* | --- |
* | "Unknown error. Please try again later." |
*
* @param {Auth_Unknown_Error_RetryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_unknown_error_retry = /** @type {((inputs?: Auth_Unknown_Error_RetryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Unknown_Error_RetryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_unknown_error_retry(inputs)
	return __zh.auth_unknown_error_retry(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load adopted knowledge: {message}" |
*
* @param {Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_adopted_knowledge_load_error = /** @type {((inputs: Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_adopted_knowledge_load_error(inputs)
	return __zh.assist_tasks_adopted_knowledge_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Adopted Knowledge ({count})" |
*
* @param {Assist_Tasks_Adopted_Knowledge_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_adopted_knowledge_title = /** @type {((inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Adopted_Knowledge_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_adopted_knowledge_title(inputs)
	return __zh.assist_tasks_adopted_knowledge_title(inputs)
});
/**
* | output |
* | --- |
* | "Add Supplemental Knowledge" |
*
* @param {Assist_Tasks_Add_SupplementalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_add_supplemental = /** @type {((inputs?: Assist_Tasks_Add_SupplementalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Add_SupplementalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_add_supplemental(inputs)
	return __zh.assist_tasks_add_supplemental(inputs)
});
/**
* | output |
* | --- |
* | "Assignee" |
*
* @param {Assist_Tasks_Assignee_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_assignee_label = /** @type {((inputs?: Assist_Tasks_Assignee_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Assignee_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_assignee_label(inputs)
	return __zh.assist_tasks_assignee_label(inputs)
});
/**
* | output |
* | --- |
* | "Close event details" |
*
* @param {Assist_Tasks_Close_Event_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_close_event_detail = /** @type {((inputs?: Assist_Tasks_Close_Event_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Close_Event_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_close_event_detail(inputs)
	return __zh.assist_tasks_close_event_detail(inputs)
});
/**
* | output |
* | --- |
* | "Close details" |
*
* @param {Assist_Tasks_Close_Session_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_close_session_detail = /** @type {((inputs?: Assist_Tasks_Close_Session_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Close_Session_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_close_session_detail(inputs)
	return __zh.assist_tasks_close_session_detail(inputs)
});
/**
* | output |
* | --- |
* | "Confirm and Send" |
*
* @param {Assist_Tasks_Confirm_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirm_reply = /** @type {((inputs?: Assist_Tasks_Confirm_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirm_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_confirm_reply(inputs)
	return __zh.assist_tasks_confirm_reply(inputs)
});
/**
* | output |
* | --- |
* | "Suggested reply confirmed." |
*
* @param {Assist_Tasks_Confirm_Reply_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirm_reply_success = /** @type {((inputs?: Assist_Tasks_Confirm_Reply_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirm_Reply_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_confirm_reply_success(inputs)
	return __zh.assist_tasks_confirm_reply_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to confirm reply. Please try again later." |
*
* @param {Assist_Tasks_Confirm_Reply_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirm_reply_error = /** @type {((inputs?: Assist_Tasks_Confirm_Reply_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirm_Reply_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_confirm_reply_error(inputs)
	return __zh.assist_tasks_confirm_reply_error(inputs)
});
/**
* | output |
* | --- |
* | "Confirming..." |
*
* @param {Assist_Tasks_Confirming_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirming_reply = /** @type {((inputs?: Assist_Tasks_Confirming_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirming_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_confirming_reply(inputs)
	return __zh.assist_tasks_confirming_reply(inputs)
});
/**
* | output |
* | --- |
* | "Dismiss Suggestion" |
*
* @param {Assist_Tasks_Reject_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_reject_reply = /** @type {((inputs?: Assist_Tasks_Reject_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Reject_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_reject_reply(inputs)
	return __zh.assist_tasks_reject_reply(inputs)
});
/**
* | output |
* | --- |
* | "Suggested reply dismissed." |
*
* @param {Assist_Tasks_Reject_Reply_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_reject_reply_success = /** @type {((inputs?: Assist_Tasks_Reject_Reply_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Reject_Reply_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_reject_reply_success(inputs)
	return __zh.assist_tasks_reject_reply_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to dismiss the suggested reply. Please try again later." |
*
* @param {Assist_Tasks_Reject_Reply_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_reject_reply_error = /** @type {((inputs?: Assist_Tasks_Reject_Reply_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Reject_Reply_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_reject_reply_error(inputs)
	return __zh.assist_tasks_reject_reply_error(inputs)
});
/**
* | output |
* | --- |
* | "Dismissing..." |
*
* @param {Assist_Tasks_Rejecting_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_rejecting_reply = /** @type {((inputs?: Assist_Tasks_Rejecting_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Rejecting_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_rejecting_reply(inputs)
	return __zh.assist_tasks_rejecting_reply(inputs)
});
/**
* | output |
* | --- |
* | "Review Suggestion" |
*
* @param {Assist_Tasks_Show_Suggested_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_show_suggested_reply = /** @type {((inputs?: Assist_Tasks_Show_Suggested_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Show_Suggested_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_show_suggested_reply(inputs)
	return __zh.assist_tasks_show_suggested_reply(inputs)
});
/**
* | output |
* | --- |
* | "Hide Suggestion" |
*
* @param {Assist_Tasks_Hide_Suggested_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_hide_suggested_reply = /** @type {((inputs?: Assist_Tasks_Hide_Suggested_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Hide_Suggested_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_hide_suggested_reply(inputs)
	return __zh.assist_tasks_hide_suggested_reply(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load event details" |
*
* @param {Assist_Tasks_Detail_Load_Failed_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_detail_load_failed_title = /** @type {((inputs?: Assist_Tasks_Detail_Load_Failed_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Detail_Load_Failed_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_detail_load_failed_title(inputs)
	return __zh.assist_tasks_detail_load_failed_title(inputs)
});
/**
* | output |
* | --- |
* | "This event does not exist under the current company, or you do not have permission to view it." |
*
* @param {Assist_Tasks_Detail_Not_Found_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_detail_not_found_desc = /** @type {((inputs?: Assist_Tasks_Detail_Not_Found_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Detail_Not_Found_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_detail_not_found_desc(inputs)
	return __zh.assist_tasks_detail_not_found_desc(inputs)
});
/**
* | output |
* | --- |
* | "Event not found" |
*
* @param {Assist_Tasks_Detail_Not_Found_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_detail_not_found_title = /** @type {((inputs?: Assist_Tasks_Detail_Not_Found_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Detail_Not_Found_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_detail_not_found_title(inputs)
	return __zh.assist_tasks_detail_not_found_title(inputs)
});
/**
* | output |
* | --- |
* | "Try clearing the keyword or switching filters." |
*
* @param {Assist_Tasks_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_empty_desc = /** @type {((inputs?: Assist_Tasks_Empty_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Empty_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_empty_desc(inputs)
	return __zh.assist_tasks_empty_desc(inputs)
});
/**
* | output |
* | --- |
* | "No tasks match the current filters" |
*
* @param {Assist_Tasks_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_empty_title = /** @type {((inputs?: Assist_Tasks_Empty_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Empty_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_empty_title(inputs)
	return __zh.assist_tasks_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Task Detail" |
*
* @param {Assist_Tasks_Event_Detail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_event_detail_title = /** @type {((inputs?: Assist_Tasks_Event_Detail_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Event_Detail_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_event_detail_title(inputs)
	return __zh.assist_tasks_event_detail_title(inputs)
});
/**
* | output |
* | --- |
* | "Task Detail" |
*
* @param {Assist_Tasks_Session_Detail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_session_detail_title = /** @type {((inputs?: Assist_Tasks_Session_Detail_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Session_Detail_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_session_detail_title(inputs)
	return __zh.assist_tasks_session_detail_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load events" |
*
* @param {Assist_Tasks_Event_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_event_load_failed = /** @type {((inputs?: Assist_Tasks_Event_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Event_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_event_load_failed(inputs)
	return __zh.assist_tasks_event_load_failed(inputs)
});
/**
* | output |
* | --- |
* | "All Types" |
*
* @param {Assist_Tasks_Filter_All_TypesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_all_types = /** @type {((inputs?: Assist_Tasks_Filter_All_TypesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_All_TypesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_all_types(inputs)
	return __zh.assist_tasks_filter_all_types(inputs)
});
/**
* | output |
* | --- |
* | "All Statuses" |
*
* @param {Assist_Tasks_Filter_Status_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_all = /** @type {((inputs?: Assist_Tasks_Filter_Status_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_all(inputs)
	return __zh.assist_tasks_filter_status_all(inputs)
});
/**
* | output |
* | --- |
* | "Ignored" |
*
* @param {Assist_Tasks_Filter_Status_IgnoredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_ignored = /** @type {((inputs?: Assist_Tasks_Filter_Status_IgnoredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_IgnoredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_ignored(inputs)
	return __zh.assist_tasks_filter_status_ignored(inputs)
});
/**
* | output |
* | --- |
* | "Status filter" |
*
* @param {Assist_Tasks_Filter_Status_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_label = /** @type {((inputs?: Assist_Tasks_Filter_Status_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_label(inputs)
	return __zh.assist_tasks_filter_status_label(inputs)
});
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Assist_Tasks_Filter_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_pending = /** @type {((inputs?: Assist_Tasks_Filter_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_pending(inputs)
	return __zh.assist_tasks_filter_status_pending(inputs)
});
/**
* | output |
* | --- |
* | "Processing" |
*
* @param {Assist_Tasks_Filter_Status_ProcessingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_processing = /** @type {((inputs?: Assist_Tasks_Filter_Status_ProcessingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_ProcessingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_processing(inputs)
	return __zh.assist_tasks_filter_status_processing(inputs)
});
/**
* | output |
* | --- |
* | "Resolved" |
*
* @param {Assist_Tasks_Filter_Status_ResolvedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_resolved = /** @type {((inputs?: Assist_Tasks_Filter_Status_ResolvedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_ResolvedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_resolved(inputs)
	return __zh.assist_tasks_filter_status_resolved(inputs)
});
/**
* | output |
* | --- |
* | "Taken Over" |
*
* @param {Assist_Tasks_Filter_Status_Taken_OverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_taken_over = /** @type {((inputs?: Assist_Tasks_Filter_Status_Taken_OverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_Taken_OverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_status_taken_over(inputs)
	return __zh.assist_tasks_filter_status_taken_over(inputs)
});
/**
* | output |
* | --- |
* | "Type filter" |
*
* @param {Assist_Tasks_Filter_Type_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_type_label = /** @type {((inputs?: Assist_Tasks_Filter_Type_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Type_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_filter_type_label(inputs)
	return __zh.assist_tasks_filter_type_label(inputs)
});
/**
* | output |
* | --- |
* | "Ignore" |
*
* @param {Assist_Tasks_IgnoreInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore = /** @type {((inputs?: Assist_Tasks_IgnoreInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_IgnoreInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore(inputs)
	return __zh.assist_tasks_ignore(inputs)
});
/**
* | output |
* | --- |
* | "Confirm Ignore" |
*
* @param {Assist_Tasks_Ignore_Confirm_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_action = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore_confirm_action(inputs)
	return __zh.assist_tasks_ignore_confirm_action(inputs)
});
/**
* | output |
* | --- |
* | "After ignoring, this event will be marked as ignored and removed from the pending list." |
*
* @param {Assist_Tasks_Ignore_Confirm_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_desc = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore_confirm_desc(inputs)
	return __zh.assist_tasks_ignore_confirm_desc(inputs)
});
/**
* | output |
* | --- |
* | "Ignore this event?" |
*
* @param {Assist_Tasks_Ignore_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_title = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore_confirm_title(inputs)
	return __zh.assist_tasks_ignore_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to ignore the event. Please try again later." |
*
* @param {Assist_Tasks_Ignore_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_error = /** @type {((inputs?: Assist_Tasks_Ignore_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore_error(inputs)
	return __zh.assist_tasks_ignore_error(inputs)
});
/**
* | output |
* | --- |
* | "Event ignored." |
*
* @param {Assist_Tasks_Ignore_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_success = /** @type {((inputs?: Assist_Tasks_Ignore_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignore_success(inputs)
	return __zh.assist_tasks_ignore_success(inputs)
});
/**
* | output |
* | --- |
* | "Ignoring..." |
*
* @param {Assist_Tasks_IgnoringInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignoring = /** @type {((inputs?: Assist_Tasks_IgnoringInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_IgnoringInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_ignoring(inputs)
	return __zh.assist_tasks_ignoring(inputs)
});
/**
* | output |
* | --- |
* | "Event List" |
*
* @param {Assist_Tasks_List_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_list_title = /** @type {((inputs?: Assist_Tasks_List_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_List_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_list_title(inputs)
	return __zh.assist_tasks_list_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load messages: {message}" |
*
* @param {Assist_Tasks_Messages_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_messages_load_error = /** @type {((inputs: Assist_Tasks_Messages_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Messages_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_messages_load_error(inputs)
	return __zh.assist_tasks_messages_load_error(inputs)
});
/**
* | output |
* | --- |
* | "How should Lucius reply to the user?" |
*
* @param {Assist_Tasks_Message_Input_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_input_placeholder = /** @type {((inputs?: Assist_Tasks_Message_Input_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Input_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_message_input_placeholder(inputs)
	return __zh.assist_tasks_message_input_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Edit suggested reply..." |
*
* @param {Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_suggested_reply_input_placeholder = /** @type {((inputs?: Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_suggested_reply_input_placeholder(inputs)
	return __zh.assist_tasks_suggested_reply_input_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Send to Lucius" |
*
* @param {Assist_Tasks_Message_SendInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send = /** @type {((inputs?: Assist_Tasks_Message_SendInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_SendInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_message_send(inputs)
	return __zh.assist_tasks_message_send(inputs)
});
/**
* | output |
* | --- |
* | "Failed to send the message. Please try again later." |
*
* @param {Assist_Tasks_Message_Send_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_error = /** @type {((inputs?: Assist_Tasks_Message_Send_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_message_send_error(inputs)
	return __zh.assist_tasks_message_send_error(inputs)
});
/**
* | output |
* | --- |
* | "Sending..." |
*
* @param {Assist_Tasks_Message_Send_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_pending = /** @type {((inputs?: Assist_Tasks_Message_Send_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_message_send_pending(inputs)
	return __zh.assist_tasks_message_send_pending(inputs)
});
/**
* | output |
* | --- |
* | "Message sent." |
*
* @param {Assist_Tasks_Message_Send_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_success = /** @type {((inputs?: Assist_Tasks_Message_Send_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_message_send_success(inputs)
	return __zh.assist_tasks_message_send_success(inputs)
});
/**
* | output |
* | --- |
* | "There is no message content to display for this event." |
*
* @param {Assist_Tasks_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_messages = /** @type {((inputs?: Assist_Tasks_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_no_messages(inputs)
	return __zh.assist_tasks_no_messages(inputs)
});
/**
* | output |
* | --- |
* | "No owner" |
*
* @param {Assist_Tasks_No_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_owner = /** @type {((inputs?: Assist_Tasks_No_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_no_owner(inputs)
	return __zh.assist_tasks_no_owner(inputs)
});
/**
* | output |
* | --- |
* | "N" |
*
* @param {Assist_Tasks_No_Owner_ShortInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_owner_short = /** @type {((inputs?: Assist_Tasks_No_Owner_ShortInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_Owner_ShortInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_no_owner_short(inputs)
	return __zh.assist_tasks_no_owner_short(inputs)
});
/**
* | output |
* | --- |
* | "No event summary" |
*
* @param {Assist_Tasks_No_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_summary = /** @type {((inputs?: Assist_Tasks_No_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_no_summary(inputs)
	return __zh.assist_tasks_no_summary(inputs)
});
/**
* | output |
* | --- |
* | "Overdue {count} day(s)" |
*
* @param {Assist_Tasks_Overdue_DaysInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_days = /** @type {((inputs: Assist_Tasks_Overdue_DaysInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_DaysInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_overdue_days(inputs)
	return __zh.assist_tasks_overdue_days(inputs)
});
/**
* | output |
* | --- |
* | "Overdue" |
*
* @param {Assist_Tasks_Overdue_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_default = /** @type {((inputs?: Assist_Tasks_Overdue_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_overdue_default(inputs)
	return __zh.assist_tasks_overdue_default(inputs)
});
/**
* | output |
* | --- |
* | "Overdue {count} hour(s)" |
*
* @param {Assist_Tasks_Overdue_HoursInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_hours = /** @type {((inputs: Assist_Tasks_Overdue_HoursInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_HoursInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_overdue_hours(inputs)
	return __zh.assist_tasks_overdue_hours(inputs)
});
/**
* | output |
* | --- |
* | "Participant avatar" |
*
* @param {Assist_Tasks_Participant_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_participant_avatar_alt = /** @type {((inputs?: Assist_Tasks_Participant_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Participant_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_participant_avatar_alt(inputs)
	return __zh.assist_tasks_participant_avatar_alt(inputs)
});
/**
* | output |
* | --- |
* | "Manually Confirmed" |
*
* @param {Assist_Tasks_Review_ConfirmedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_confirmed = /** @type {((inputs?: Assist_Tasks_Review_ConfirmedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_ConfirmedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_review_confirmed(inputs)
	return __zh.assist_tasks_review_confirmed(inputs)
});
/**
* | output |
* | --- |
* | "Pending Manual Review" |
*
* @param {Assist_Tasks_Review_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_pending = /** @type {((inputs?: Assist_Tasks_Review_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_review_pending(inputs)
	return __zh.assist_tasks_review_pending(inputs)
});
/**
* | output |
* | --- |
* | "Taken Over" |
*
* @param {Assist_Tasks_Review_Taken_OverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_taken_over = /** @type {((inputs?: Assist_Tasks_Review_Taken_OverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_Taken_OverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_review_taken_over(inputs)
	return __zh.assist_tasks_review_taken_over(inputs)
});
/**
* | output |
* | --- |
* | "Resolved" |
*
* @param {Assist_Tasks_ResolveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve = /** @type {((inputs?: Assist_Tasks_ResolveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_ResolveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_resolve(inputs)
	return __zh.assist_tasks_resolve(inputs)
});
/**
* | output |
* | --- |
* | "Failed to resolve the event. Please try again later." |
*
* @param {Assist_Tasks_Resolve_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve_error = /** @type {((inputs?: Assist_Tasks_Resolve_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Resolve_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_resolve_error(inputs)
	return __zh.assist_tasks_resolve_error(inputs)
});
/**
* | output |
* | --- |
* | "Resolving..." |
*
* @param {Assist_Tasks_Resolve_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve_pending = /** @type {((inputs?: Assist_Tasks_Resolve_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Resolve_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_resolve_pending(inputs)
	return __zh.assist_tasks_resolve_pending(inputs)
});
/**
* | output |
* | --- |
* | "Event resolved." |
*
* @param {Assist_Tasks_Resolve_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve_success = /** @type {((inputs?: Assist_Tasks_Resolve_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Resolve_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_resolve_success(inputs)
	return __zh.assist_tasks_resolve_success(inputs)
});
/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Assist_Tasks_Save_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_save_pending = /** @type {((inputs?: Assist_Tasks_Save_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Save_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_save_pending(inputs)
	return __zh.assist_tasks_save_pending(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save supplemental knowledge. Please try again later." |
*
* @param {Assist_Tasks_Save_Supplemental_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_save_supplemental_error = /** @type {((inputs?: Assist_Tasks_Save_Supplemental_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Save_Supplemental_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_save_supplemental_error(inputs)
	return __zh.assist_tasks_save_supplemental_error(inputs)
});
/**
* | output |
* | --- |
* | "Supplemental knowledge saved." |
*
* @param {Assist_Tasks_Save_Supplemental_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_save_supplemental_success = /** @type {((inputs?: Assist_Tasks_Save_Supplemental_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Save_Supplemental_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_save_supplemental_success(inputs)
	return __zh.assist_tasks_save_supplemental_success(inputs)
});
/**
* | output |
* | --- |
* | "Search keyword" |
*
* @param {Assist_Tasks_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_search_placeholder = /** @type {((inputs?: Assist_Tasks_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_search_placeholder(inputs)
	return __zh.assist_tasks_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Enter supplemental knowledge..." |
*
* @param {Assist_Tasks_Supplemental_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_supplemental_placeholder = /** @type {((inputs?: Assist_Tasks_Supplemental_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Supplemental_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_supplemental_placeholder(inputs)
	return __zh.assist_tasks_supplemental_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Take Over Task" |
*
* @param {Assist_Tasks_TakeoverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover = /** @type {((inputs?: Assist_Tasks_TakeoverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_TakeoverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_takeover(inputs)
	return __zh.assist_tasks_takeover(inputs)
});
/**
* | output |
* | --- |
* | "Failed to take over the event. Please try again later." |
*
* @param {Assist_Tasks_Takeover_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover_error = /** @type {((inputs?: Assist_Tasks_Takeover_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Takeover_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_takeover_error(inputs)
	return __zh.assist_tasks_takeover_error(inputs)
});
/**
* | output |
* | --- |
* | "Taking over..." |
*
* @param {Assist_Tasks_Takeover_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover_pending = /** @type {((inputs?: Assist_Tasks_Takeover_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Takeover_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_takeover_pending(inputs)
	return __zh.assist_tasks_takeover_pending(inputs)
});
/**
* | output |
* | --- |
* | "Event taken over." |
*
* @param {Assist_Tasks_Takeover_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover_success = /** @type {((inputs?: Assist_Tasks_Takeover_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Takeover_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_takeover_success(inputs)
	return __zh.assist_tasks_takeover_success(inputs)
});
/**
* | output |
* | --- |
* | "Timed Out ({count})" |
*
* @param {Assist_Tasks_Timed_Out_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_timed_out_count = /** @type {((inputs: Assist_Tasks_Timed_Out_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Timed_Out_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_timed_out_count(inputs)
	return __zh.assist_tasks_timed_out_count(inputs)
});
/**
* | output |
* | --- |
* | "Advertisement" |
*
* @param {Assist_Tasks_Type_AdvertisementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_advertisement = /** @type {((inputs?: Assist_Tasks_Type_AdvertisementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_AdvertisementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_advertisement(inputs)
	return __zh.assist_tasks_type_advertisement(inputs)
});
/**
* | output |
* | --- |
* | "Assignment Request" |
*
* @param {Assist_Tasks_Type_Assign_RequestInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_assign_request = /** @type {((inputs?: Assist_Tasks_Type_Assign_RequestInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Assign_RequestInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_assign_request(inputs)
	return __zh.assist_tasks_type_assign_request(inputs)
});
/**
* | output |
* | --- |
* | "Bug Report" |
*
* @param {Assist_Tasks_Type_Bug_ReportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_bug_report = /** @type {((inputs?: Assist_Tasks_Type_Bug_ReportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Bug_ReportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_bug_report(inputs)
	return __zh.assist_tasks_type_bug_report(inputs)
});
/**
* | output |
* | --- |
* | "Business Cooperation" |
*
* @param {Assist_Tasks_Type_Business_CooperationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_business_cooperation = /** @type {((inputs?: Assist_Tasks_Type_Business_CooperationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Business_CooperationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_business_cooperation(inputs)
	return __zh.assist_tasks_type_business_cooperation(inputs)
});
/**
* | output |
* | --- |
* | "Exception Issue" |
*
* @param {Assist_Tasks_Type_Exception_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_exception_issue = /** @type {((inputs?: Assist_Tasks_Type_Exception_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Exception_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_exception_issue(inputs)
	return __zh.assist_tasks_type_exception_issue(inputs)
});
/**
* | output |
* | --- |
* | "Feedback" |
*
* @param {Assist_Tasks_Type_FeedbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_feedback = /** @type {((inputs?: Assist_Tasks_Type_FeedbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_FeedbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_feedback(inputs)
	return __zh.assist_tasks_type_feedback(inputs)
});
/**
* | output |
* | --- |
* | "Knowledge Request" |
*
* @param {Assist_Tasks_Type_Knowledge_RequestInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_knowledge_request = /** @type {((inputs?: Assist_Tasks_Type_Knowledge_RequestInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Knowledge_RequestInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_knowledge_request(inputs)
	return __zh.assist_tasks_type_knowledge_request(inputs)
});
/**
* | output |
* | --- |
* | "Message Deleted" |
*
* @param {Assist_Tasks_Type_Message_DeletionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_message_deletion = /** @type {((inputs?: Assist_Tasks_Type_Message_DeletionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Message_DeletionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_message_deletion(inputs)
	return __zh.assist_tasks_type_message_deletion(inputs)
});
/**
* | output |
* | --- |
* | "Order Issue" |
*
* @param {Assist_Tasks_Type_Order_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_order_issue = /** @type {((inputs?: Assist_Tasks_Type_Order_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Order_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_order_issue(inputs)
	return __zh.assist_tasks_type_order_issue(inputs)
});
/**
* | output |
* | --- |
* | "Payment Issue" |
*
* @param {Assist_Tasks_Type_Payment_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_payment_issue = /** @type {((inputs?: Assist_Tasks_Type_Payment_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Payment_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_payment_issue(inputs)
	return __zh.assist_tasks_type_payment_issue(inputs)
});
/**
* | output |
* | --- |
* | "Product Feedback" |
*
* @param {Assist_Tasks_Type_Product_FeedbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_product_feedback = /** @type {((inputs?: Assist_Tasks_Type_Product_FeedbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Product_FeedbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_product_feedback(inputs)
	return __zh.assist_tasks_type_product_feedback(inputs)
});
/**
* | output |
* | --- |
* | "Other Issue" |
*
* @param {Assist_Tasks_Type_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_unknown = /** @type {((inputs?: Assist_Tasks_Type_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_unknown(inputs)
	return __zh.assist_tasks_type_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Unrecognized Information" |
*
* @param {Assist_Tasks_Type_Unrecognized_InformationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_unrecognized_information = /** @type {((inputs?: Assist_Tasks_Type_Unrecognized_InformationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Unrecognized_InformationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_unrecognized_information(inputs)
	return __zh.assist_tasks_type_unrecognized_information(inputs)
});
/**
* | output |
* | --- |
* | "Usage Issue" |
*
* @param {Assist_Tasks_Type_Usage_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_usage_issue = /** @type {((inputs?: Assist_Tasks_Type_Usage_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Usage_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_type_usage_issue(inputs)
	return __zh.assist_tasks_type_usage_issue(inputs)
});
/**
* | output |
* | --- |
* | "Unknown channel" |
*
* @param {Assist_Tasks_Unknown_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_unknown_channel = /** @type {((inputs?: Assist_Tasks_Unknown_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Unknown_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_unknown_channel(inputs)
	return __zh.assist_tasks_unknown_channel(inputs)
});
/**
* | output |
* | --- |
* | "Untitled task" |
*
* @param {Assist_Tasks_Unnamed_TaskInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_unnamed_task = /** @type {((inputs?: Assist_Tasks_Unnamed_TaskInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Unnamed_TaskInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_unnamed_task(inputs)
	return __zh.assist_tasks_unnamed_task(inputs)
});
/**
* | output |
* | --- |
* | "View adopted knowledge" |
*
* @param {Assist_Tasks_View_Adopted_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_adopted_knowledge = /** @type {((inputs?: Assist_Tasks_View_Adopted_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_Adopted_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_view_adopted_knowledge(inputs)
	return __zh.assist_tasks_view_adopted_knowledge(inputs)
});
/**
* | output |
* | --- |
* | "View adopted knowledge, {count} item(s)" |
*
* @param {Assist_Tasks_View_Adopted_Knowledge_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_adopted_knowledge_count = /** @type {((inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_Adopted_Knowledge_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_view_adopted_knowledge_count(inputs)
	return __zh.assist_tasks_view_adopted_knowledge_count(inputs)
});
/**
* | output |
* | --- |
* | "View task: {title}" |
*
* @param {Assist_Tasks_View_ItemInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_item = /** @type {((inputs: Assist_Tasks_View_ItemInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_ItemInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.assist_tasks_view_item(inputs)
	return __zh.assist_tasks_view_item(inputs)
});
/**
* | output |
* | --- |
* | "Chat attachment" |
*
* @param {Client_Chat_Attachment_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_attachment_alt = /** @type {((inputs?: Client_Chat_Attachment_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Attachment_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_attachment_alt(inputs)
	return __zh.client_chat_attachment_alt(inputs)
});
/**
* | output |
* | --- |
* | "Untitled chat" |
*
* @param {Client_Chat_Draft_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_draft_session = /** @type {((inputs?: Client_Chat_Draft_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Draft_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_draft_session(inputs)
	return __zh.client_chat_draft_session(inputs)
});
/**
* | output |
* | --- |
* | "Draft" |
*
* @param {Client_Chat_Draft_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_draft_badge = /** @type {((inputs?: Client_Chat_Draft_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Draft_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_draft_badge(inputs)
	return __zh.client_chat_draft_badge(inputs)
});
/**
* | output |
* | --- |
* | "Loading chat title" |
*
* @param {Client_Chat_Loading_Session_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_loading_session_title = /** @type {((inputs?: Client_Chat_Loading_Session_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Loading_Session_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_loading_session_title(inputs)
	return __zh.client_chat_loading_session_title(inputs)
});
/**
* | output |
* | --- |
* | "Lucius Client Agent" |
*
* @param {Client_Chat_Empty_Brand_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_brand_title = /** @type {((inputs?: Client_Chat_Empty_Brand_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_Brand_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_empty_brand_title(inputs)
	return __zh.client_chat_empty_brand_title(inputs)
});
/**
* | output |
* | --- |
* | "No chats yet. Click “New chat” to begin." |
*
* @param {Client_Chat_Empty_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_sessions = /** @type {((inputs?: Client_Chat_Empty_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_empty_sessions(inputs)
	return __zh.client_chat_empty_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Which step should I click?" |
*
* @param {Client_Chat_Empty_Input_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_input_hint = /** @type {((inputs?: Client_Chat_Empty_Input_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_Input_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_empty_input_hint(inputs)
	return __zh.client_chat_empty_input_hint(inputs)
});
/**
* | output |
* | --- |
* | "You can upload up to {count} images." |
*
* @param {Client_Chat_Image_Count_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_count_limit = /** @type {((inputs: Client_Chat_Image_Count_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_Count_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_image_count_limit(inputs)
	return __zh.client_chat_image_count_limit(inputs)
});
/**
* | output |
* | --- |
* | "Only image files are supported." |
*
* @param {Client_Chat_Image_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_only = /** @type {((inputs?: Client_Chat_Image_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_image_only(inputs)
	return __zh.client_chat_image_only(inputs)
});
/**
* | output |
* | --- |
* | "Images must be smaller than {size}." |
*
* @param {Client_Chat_Image_Size_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_size_limit = /** @type {((inputs: Client_Chat_Image_Size_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_Size_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_image_size_limit(inputs)
	return __zh.client_chat_image_size_limit(inputs)
});
/**
* | output |
* | --- |
* | "History" |
*
* @param {Client_Chat_History_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_history_sessions = /** @type {((inputs?: Client_Chat_History_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_History_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_history_sessions(inputs)
	return __zh.client_chat_history_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Type a message..." |
*
* @param {Client_Chat_Input_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_input_placeholder = /** @type {((inputs?: Client_Chat_Input_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Input_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_input_placeholder(inputs)
	return __zh.client_chat_input_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load sessions" |
*
* @param {Client_Chat_Load_Sessions_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_load_sessions_failed = /** @type {((inputs?: Client_Chat_Load_Sessions_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Load_Sessions_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_load_sessions_failed(inputs)
	return __zh.client_chat_load_sessions_failed(inputs)
});
/**
* | output |
* | --- |
* | "Copy message" |
*
* @param {Client_Chat_Copy_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_message = /** @type {((inputs?: Client_Chat_Copy_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_copy_message(inputs)
	return __zh.client_chat_copy_message(inputs)
});
/**
* | output |
* | --- |
* | "Message copied." |
*
* @param {Client_Chat_Copy_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_success = /** @type {((inputs?: Client_Chat_Copy_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_copy_success(inputs)
	return __zh.client_chat_copy_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to copy message. Please try again." |
*
* @param {Client_Chat_Copy_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_failed = /** @type {((inputs?: Client_Chat_Copy_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_copy_failed(inputs)
	return __zh.client_chat_copy_failed(inputs)
});
/**
* | output |
* | --- |
* | "Like message" |
*
* @param {Client_Chat_Like_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_like_message = /** @type {((inputs?: Client_Chat_Like_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Like_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_like_message(inputs)
	return __zh.client_chat_like_message(inputs)
});
/**
* | output |
* | --- |
* | "Dislike message" |
*
* @param {Client_Chat_Dislike_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_dislike_message = /** @type {((inputs?: Client_Chat_Dislike_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Dislike_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_dislike_message(inputs)
	return __zh.client_chat_dislike_message(inputs)
});
/**
* | output |
* | --- |
* | "Regenerate message" |
*
* @param {Client_Chat_Regenerate_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_regenerate_message = /** @type {((inputs?: Client_Chat_Regenerate_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Regenerate_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_regenerate_message(inputs)
	return __zh.client_chat_regenerate_message(inputs)
});
/**
* | output |
* | --- |
* | "Lucius" |
*
* @param {Client_Chat_Lucius_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_lucius_name = /** @type {((inputs?: Client_Chat_Lucius_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Lucius_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_lucius_name(inputs)
	return __zh.client_chat_lucius_name(inputs)
});
/**
* | output |
* | --- |
* | "Me" |
*
* @param {Client_Chat_MeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_me = /** @type {((inputs?: Client_Chat_MeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_MeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_me(inputs)
	return __zh.client_chat_me(inputs)
});
/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Client_Chat_More_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_more_actions = /** @type {((inputs?: Client_Chat_More_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_More_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_more_actions(inputs)
	return __zh.client_chat_more_actions(inputs)
});
/**
* | output |
* | --- |
* | "New chat" |
*
* @param {Client_Chat_New_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_new_session = /** @type {((inputs?: Client_Chat_New_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_New_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_new_session(inputs)
	return __zh.client_chat_new_session(inputs)
});
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Client_Chat_Next_PageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_next_page = /** @type {((inputs?: Client_Chat_Next_PageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Next_PageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_next_page(inputs)
	return __zh.client_chat_next_page(inputs)
});
/**
* | output |
* | --- |
* | "No messages yet" |
*
* @param {Client_Chat_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_no_messages = /** @type {((inputs?: Client_Chat_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_no_messages(inputs)
	return __zh.client_chat_no_messages(inputs)
});
/**
* | output |
* | --- |
* | "{page}/{totalPages} · total {total}" |
*
* @param {Client_Chat_Page_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_page_status = /** @type {((inputs: Client_Chat_Page_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Page_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_page_status(inputs)
	return __zh.client_chat_page_status(inputs)
});
/**
* | output |
* | --- |
* | "Star chat" |
*
* @param {Client_Chat_Pin_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_pin_session = /** @type {((inputs?: Client_Chat_Pin_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Pin_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_pin_session(inputs)
	return __zh.client_chat_pin_session(inputs)
});
/**
* | output |
* | --- |
* | "Empty message" |
*
* @param {Client_Chat_Preview_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_preview_empty = /** @type {((inputs?: Client_Chat_Preview_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Preview_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_preview_empty(inputs)
	return __zh.client_chat_preview_empty(inputs)
});
/**
* | output |
* | --- |
* | "Session" |
*
* @param {Client_Chat_Preview_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_preview_fallback = /** @type {((inputs?: Client_Chat_Preview_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Preview_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_preview_fallback(inputs)
	return __zh.client_chat_preview_fallback(inputs)
});
/**
* | output |
* | --- |
* | "[Image]" |
*
* @param {Client_Chat_Preview_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_preview_image = /** @type {((inputs?: Client_Chat_Preview_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Preview_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_preview_image(inputs)
	return __zh.client_chat_preview_image(inputs)
});
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Client_Chat_Prev_PageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prev_page = /** @type {((inputs?: Client_Chat_Prev_PageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prev_PageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_prev_page(inputs)
	return __zh.client_chat_prev_page(inputs)
});
/**
* | output |
* | --- |
* | "What can Lucius do for me?" |
*
* @param {Client_Chat_Prompt_CapabilitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_capabilities = /** @type {((inputs?: Client_Chat_Prompt_CapabilitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_CapabilitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_prompt_capabilities(inputs)
	return __zh.client_chat_prompt_capabilities(inputs)
});
/**
* | output |
* | --- |
* | "How do I invite Lucius Agent into a user community?" |
*
* @param {Client_Chat_Prompt_Invite_AgentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_invite_agent = /** @type {((inputs?: Client_Chat_Prompt_Invite_AgentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Invite_AgentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_prompt_invite_agent(inputs)
	return __zh.client_chat_prompt_invite_agent(inputs)
});
/**
* | output |
* | --- |
* | "What is the difference between Lucius Agent roles?" |
*
* @param {Client_Chat_Prompt_Role_DifferenceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_role_difference = /** @type {((inputs?: Client_Chat_Prompt_Role_DifferenceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Role_DifferenceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_prompt_role_difference(inputs)
	return __zh.client_chat_prompt_role_difference(inputs)
});
/**
* | output |
* | --- |
* | "How do I update knowledge in the knowledge base?" |
*
* @param {Client_Chat_Prompt_Update_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_update_knowledge = /** @type {((inputs?: Client_Chat_Prompt_Update_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Update_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_prompt_update_knowledge(inputs)
	return __zh.client_chat_prompt_update_knowledge(inputs)
});
/**
* | output |
* | --- |
* | "A new reply is ready in “{title}”." |
*
* @param {Client_Chat_Reply_Ready_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_reply_ready_description = /** @type {((inputs: Client_Chat_Reply_Ready_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Reply_Ready_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_reply_ready_description(inputs)
	return __zh.client_chat_reply_ready_description(inputs)
});
/**
* | output |
* | --- |
* | "Lucius has a new reply" |
*
* @param {Client_Chat_Reply_Ready_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_reply_ready_title = /** @type {((inputs?: Client_Chat_Reply_Ready_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Reply_Ready_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_reply_ready_title(inputs)
	return __zh.client_chat_reply_ready_title(inputs)
});
/**
* | output |
* | --- |
* | "Lucius is replying" |
*
* @param {Client_Chat_ReplyingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_replying = /** @type {((inputs?: Client_Chat_ReplyingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_ReplyingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_replying(inputs)
	return __zh.client_chat_replying(inputs)
});
/**
* | output |
* | --- |
* | "Remove" |
*
* @param {Client_Chat_Remove_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_remove_session = /** @type {((inputs?: Client_Chat_Remove_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Remove_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_remove_session(inputs)
	return __zh.client_chat_remove_session(inputs)
});
/**
* | output |
* | --- |
* | "Remove selected image" |
*
* @param {Client_Chat_Remove_Selected_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_remove_selected_image = /** @type {((inputs?: Client_Chat_Remove_Selected_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Remove_Selected_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_remove_selected_image(inputs)
	return __zh.client_chat_remove_selected_image(inputs)
});
/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Client_Chat_Rename_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_rename_session = /** @type {((inputs?: Client_Chat_Rename_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Rename_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_rename_session(inputs)
	return __zh.client_chat_rename_session(inputs)
});
/**
* | output |
* | --- |
* | "Enter a new chat title" |
*
* @param {Client_Chat_Rename_Session_PromptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_rename_session_prompt = /** @type {((inputs?: Client_Chat_Rename_Session_PromptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Rename_Session_PromptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_rename_session_prompt(inputs)
	return __zh.client_chat_rename_session_prompt(inputs)
});
/**
* | output |
* | --- |
* | "Search" |
*
* @param {Client_Chat_SearchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search = /** @type {((inputs?: Client_Chat_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_SearchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_search(inputs)
	return __zh.client_chat_search(inputs)
});
/**
* | output |
* | --- |
* | "No matching conversations" |
*
* @param {Client_Chat_Search_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_empty = /** @type {((inputs?: Client_Chat_Search_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_search_empty(inputs)
	return __zh.client_chat_search_empty(inputs)
});
/**
* | output |
* | --- |
* | "Enter keyword" |
*
* @param {Client_Chat_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_placeholder = /** @type {((inputs?: Client_Chat_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_search_placeholder(inputs)
	return __zh.client_chat_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Search conversations" |
*
* @param {Client_Chat_Search_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_title = /** @type {((inputs?: Client_Chat_Search_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_search_title(inputs)
	return __zh.client_chat_search_title(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first" |
*
* @param {Client_Chat_Select_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_select_company = /** @type {((inputs?: Client_Chat_Select_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Select_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_select_company(inputs)
	return __zh.client_chat_select_company(inputs)
});
/**
* | output |
* | --- |
* | "Send message" |
*
* @param {Client_Chat_Send_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_send_message = /** @type {((inputs?: Client_Chat_Send_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Send_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_send_message(inputs)
	return __zh.client_chat_send_message(inputs)
});
/**
* | output |
* | --- |
* | "Today" |
*
* @param {Client_Chat_Session_TodayInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_today = /** @type {((inputs?: Client_Chat_Session_TodayInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_TodayInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_session_today(inputs)
	return __zh.client_chat_session_today(inputs)
});
/**
* | output |
* | --- |
* | "A week ago" |
*
* @param {Client_Chat_Session_Week_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_week_ago = /** @type {((inputs?: Client_Chat_Session_Week_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_Week_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_session_week_ago(inputs)
	return __zh.client_chat_session_week_ago(inputs)
});
/**
* | output |
* | --- |
* | "Yesterday" |
*
* @param {Client_Chat_Session_YesterdayInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_yesterday = /** @type {((inputs?: Client_Chat_Session_YesterdayInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_YesterdayInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_session_yesterday(inputs)
	return __zh.client_chat_session_yesterday(inputs)
});
/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Client_Chat_SendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_sending = /** @type {((inputs?: Client_Chat_SendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_SendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_sending(inputs)
	return __zh.client_chat_sending(inputs)
});
/**
* | output |
* | --- |
* | "Starred" |
*
* @param {Client_Chat_Starred_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_starred_sessions = /** @type {((inputs?: Client_Chat_Starred_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Starred_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_starred_sessions(inputs)
	return __zh.client_chat_starred_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Sessions" |
*
* @param {Client_Chat_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_sessions = /** @type {((inputs?: Client_Chat_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_sessions(inputs)
	return __zh.client_chat_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Client_Chat_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_title = /** @type {((inputs?: Client_Chat_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_title(inputs)
	return __zh.client_chat_title(inputs)
});
/**
* | output |
* | --- |
* | "Remove star" |
*
* @param {Client_Chat_Unpin_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_unpin_session = /** @type {((inputs?: Client_Chat_Unpin_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Unpin_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_unpin_session(inputs)
	return __zh.client_chat_unpin_session(inputs)
});
/**
* | output |
* | --- |
* | "Upload image" |
*
* @param {Client_Chat_Upload_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_upload_image = /** @type {((inputs?: Client_Chat_Upload_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Upload_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_upload_image(inputs)
	return __zh.client_chat_upload_image(inputs)
});
/**
* | output |
* | --- |
* | "User" |
*
* @param {Client_Chat_User_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_user_fallback = /** @type {((inputs?: Client_Chat_User_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_User_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_user_fallback(inputs)
	return __zh.client_chat_user_fallback(inputs)
});
/**
* | output |
* | --- |
* | "View" |
*
* @param {Client_Chat_View_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_view_reply = /** @type {((inputs?: Client_Chat_View_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_View_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.client_chat_view_reply(inputs)
	return __zh.client_chat_view_reply(inputs)
});
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Common_BackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_back = /** @type {((inputs?: Common_BackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_back(inputs)
	return __zh.common_back(inputs)
});
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Common_CancelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_cancel = /** @type {((inputs?: Common_CancelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CancelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_cancel(inputs)
	return __zh.common_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Common_ClearInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_clear = /** @type {((inputs?: Common_ClearInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ClearInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_clear(inputs)
	return __zh.common_clear(inputs)
});
/**
* | output |
* | --- |
* | "Close" |
*
* @param {Common_CloseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_close = /** @type {((inputs?: Common_CloseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CloseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_close(inputs)
	return __zh.common_close(inputs)
});
/**
* | output |
* | --- |
* | "Coming soon" |
*
* @param {Common_Coming_SoonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_coming_soon = /** @type {((inputs?: Common_Coming_SoonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Coming_SoonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_coming_soon(inputs)
	return __zh.common_coming_soon(inputs)
});
/**
* | output |
* | --- |
* | "Error" |
*
* @param {Common_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_error = /** @type {((inputs?: Common_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_error(inputs)
	return __zh.common_error(inputs)
});
/**
* | output |
* | --- |
* | "{count} hour(s) ago" |
*
* @param {Common_Hours_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_hours_ago = /** @type {((inputs: Common_Hours_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Hours_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_hours_ago(inputs)
	return __zh.common_hours_ago(inputs)
});
/**
* | output |
* | --- |
* | "Just now" |
*
* @param {Common_Just_NowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_just_now = /** @type {((inputs?: Common_Just_NowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Just_NowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_just_now(inputs)
	return __zh.common_just_now(inputs)
});
/**
* | output |
* | --- |
* | "{count} minute(s) ago" |
*
* @param {Common_Minutes_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_minutes_ago = /** @type {((inputs: Common_Minutes_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Minutes_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_minutes_ago(inputs)
	return __zh.common_minutes_ago(inputs)
});
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Common_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_next = /** @type {((inputs?: Common_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_next(inputs)
	return __zh.common_next(inputs)
});
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Common_Next_StepInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_next_step = /** @type {((inputs?: Common_Next_StepInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Next_StepInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_next_step(inputs)
	return __zh.common_next_step(inputs)
});
/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Common_RetryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_retry = /** @type {((inputs?: Common_RetryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RetryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_retry(inputs)
	return __zh.common_retry(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Common_SaveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_save = /** @type {((inputs?: Common_SaveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SaveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_save(inputs)
	return __zh.common_save(inputs)
});
/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Common_SavingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_saving = /** @type {((inputs?: Common_SavingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_saving(inputs)
	return __zh.common_saving(inputs)
});
/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Common_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_unknown = /** @type {((inputs?: Common_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_unknown(inputs)
	return __zh.common_unknown(inputs)
});
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
	if (locale === "en") return __en.pwa_install_app(inputs)
	return __zh.pwa_install_app(inputs)
});
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Language_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_label = /** @type {((inputs?: Language_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_label(inputs)
	return __zh.language_label(inputs)
});
/**
* | output |
* | --- |
* | "中文" |
*
* @param {Language_ZhInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_zh = /** @type {((inputs?: Language_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_ZhInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_zh(inputs)
	return __zh.language_zh(inputs)
});
/**
* | output |
* | --- |
* | "English" |
*
* @param {Language_EnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_en = /** @type {((inputs?: Language_EnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_EnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_en(inputs)
	return __zh.language_en(inputs)
});
/**
* | output |
* | --- |
* | "Files" |
*
* @param {Header_Action_FilesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_action_files = /** @type {((inputs?: Header_Action_FilesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Action_FilesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_action_files(inputs)
	return __zh.header_action_files(inputs)
});
/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Header_Action_MenuInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_action_menu = /** @type {((inputs?: Header_Action_MenuInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Action_MenuInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_action_menu(inputs)
	return __zh.header_action_menu(inputs)
});
/**
* | output |
* | --- |
* | "Notifications" |
*
* @param {Header_Action_NotificationsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_action_notifications = /** @type {((inputs?: Header_Action_NotificationsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Action_NotificationsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_action_notifications(inputs)
	return __zh.header_action_notifications(inputs)
});
/**
* | output |
* | --- |
* | "Brand" |
*
* @param {Header_BrandInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_brand = /** @type {((inputs?: Header_BrandInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_BrandInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_brand(inputs)
	return __zh.header_brand(inputs)
});
/**
* | output |
* | --- |
* | "Servers" |
*
* @param {Sidebar_Group_ServersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_servers = /** @type {((inputs?: Sidebar_Group_ServersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_ServersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_group_servers(inputs)
	return __zh.sidebar_group_servers(inputs)
});
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
	if (locale === "en") return __en.sidebar_group_sessions(inputs)
	return __zh.sidebar_group_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Organization" |
*
* @param {Sidebar_Group_OrgInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_org = /** @type {((inputs?: Sidebar_Group_OrgInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_OrgInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_group_org(inputs)
	return __zh.sidebar_group_org(inputs)
});
/**
* | output |
* | --- |
* | "Org" |
*
* @param {Sidebar_Group_Org_ShortInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_org_short = /** @type {((inputs?: Sidebar_Group_Org_ShortInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_Org_ShortInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_group_org_short(inputs)
	return __zh.sidebar_group_org_short(inputs)
});
/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Sidebar_Item_ConversationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_conversation = /** @type {((inputs?: Sidebar_Item_ConversationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_ConversationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_conversation(inputs)
	return __zh.sidebar_item_conversation(inputs)
});
/**
* | output |
* | --- |
* | "Agent Config" |
*
* @param {Sidebar_Item_Agent_ConfigInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_agent_config = /** @type {((inputs?: Sidebar_Item_Agent_ConfigInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Agent_ConfigInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_agent_config(inputs)
	return __zh.sidebar_item_agent_config(inputs)
});
/**
* | output |
* | --- |
* | "User Portrait" |
*
* @param {Sidebar_Item_User_PortraitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_user_portrait = /** @type {((inputs?: Sidebar_Item_User_PortraitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_User_PortraitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_user_portrait(inputs)
	return __zh.sidebar_item_user_portrait(inputs)
});
/**
* | output |
* | --- |
* | "Community Profile" |
*
* @param {Sidebar_Item_Community_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_community_profile = /** @type {((inputs?: Sidebar_Item_Community_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Community_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_community_profile(inputs)
	return __zh.sidebar_item_community_profile(inputs)
});
/**
* | output |
* | --- |
* | "User List" |
*
* @param {Sidebar_Item_User_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_user_list = /** @type {((inputs?: Sidebar_Item_User_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_User_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_user_list(inputs)
	return __zh.sidebar_item_user_list(inputs)
});
/**
* | output |
* | --- |
* | "Tasks" |
*
* @param {Sidebar_Item_Assist_TasksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_assist_tasks = /** @type {((inputs?: Sidebar_Item_Assist_TasksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Assist_TasksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_assist_tasks(inputs)
	return __zh.sidebar_item_assist_tasks(inputs)
});
/**
* | output |
* | --- |
* | "All Sessions" |
*
* @param {Sidebar_Item_All_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_all_sessions = /** @type {((inputs?: Sidebar_Item_All_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_All_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_all_sessions(inputs)
	return __zh.sidebar_item_all_sessions(inputs)
});
/**
* | output |
* | --- |
* | "Ads Moderation" |
*
* @param {Sidebar_Item_Ad_ReviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_ad_review = /** @type {((inputs?: Sidebar_Item_Ad_ReviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Ad_ReviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_ad_review(inputs)
	return __zh.sidebar_item_ad_review(inputs)
});
/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Sidebar_Item_Client_ChatInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_client_chat = /** @type {((inputs?: Sidebar_Item_Client_ChatInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Client_ChatInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_client_chat(inputs)
	return __zh.sidebar_item_client_chat(inputs)
});
/**
* | output |
* | --- |
* | "Wiki" |
*
* @param {Sidebar_Item_Knowledge_BaseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_knowledge_base = /** @type {((inputs?: Sidebar_Item_Knowledge_BaseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Knowledge_BaseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_knowledge_base(inputs)
	return __zh.sidebar_item_knowledge_base(inputs)
});
/**
* | output |
* | --- |
* | "Daily Report" |
*
* @param {Sidebar_Item_Daily_ReportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_daily_report = /** @type {((inputs?: Sidebar_Item_Daily_ReportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Daily_ReportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_item_daily_report(inputs)
	return __zh.sidebar_item_daily_report(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Sidebar_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_settings = /** @type {((inputs?: Sidebar_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_settings(inputs)
	return __zh.sidebar_settings(inputs)
});
/**
* | output |
* | --- |
* | "Sign Out" |
*
* @param {Sidebar_Sign_OutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_sign_out = /** @type {((inputs?: Sidebar_Sign_OutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Sign_OutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_sign_out(inputs)
	return __zh.sidebar_sign_out(inputs)
});
/**
* | output |
* | --- |
* | "Not signed in" |
*
* @param {Sidebar_Not_Logged_InInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_not_logged_in = /** @type {((inputs?: Sidebar_Not_Logged_InInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Not_Logged_InInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_not_logged_in(inputs)
	return __zh.sidebar_not_logged_in(inputs)
});
/**
* | output |
* | --- |
* | "No company found" |
*
* @param {Sidebar_Company_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_company_not_found = /** @type {((inputs?: Sidebar_Company_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Company_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_company_not_found(inputs)
	return __zh.sidebar_company_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Select company" |
*
* @param {Sidebar_Select_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_select_company = /** @type {((inputs?: Sidebar_Select_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Select_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_select_company(inputs)
	return __zh.sidebar_select_company(inputs)
});
/**
* | output |
* | --- |
* | "{count} organizations" |
*
* @param {Sidebar_Servers_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_servers_count = /** @type {((inputs: Sidebar_Servers_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Servers_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sidebar_servers_count(inputs)
	return __zh.sidebar_servers_count(inputs)
});
/**
* | output |
* | --- |
* | "Wiki" |
*
* @param {Kb_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_title = /** @type {((inputs?: Kb_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_title(inputs)
	return __zh.kb_title(inputs)
});
/**
* | output |
* | --- |
* | "All Knowledge" |
*
* @param {Kb_Tab_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_tab_all = /** @type {((inputs?: Kb_Tab_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Tab_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_tab_all(inputs)
	return __zh.kb_tab_all(inputs)
});
/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Kb_Tab_DocsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_tab_docs = /** @type {((inputs?: Kb_Tab_DocsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Tab_DocsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_tab_docs(inputs)
	return __zh.kb_tab_docs(inputs)
});
/**
* | output |
* | --- |
* | "Search keyword" |
*
* @param {Kb_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_search_placeholder = /** @type {((inputs?: Kb_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_search_placeholder(inputs)
	return __zh.kb_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Kb_UploadInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload = /** @type {((inputs?: Kb_UploadInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_UploadInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload(inputs)
	return __zh.kb_upload(inputs)
});
/**
* | output |
* | --- |
* | "Total {count}" |
*
* @param {Kb_Total_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_total_count = /** @type {((inputs: Kb_Total_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Total_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_total_count(inputs)
	return __zh.kb_total_count(inputs)
});
/**
* | output |
* | --- |
* | "Source" |
*
* @param {Kb_Filter_SourceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_filter_source = /** @type {((inputs?: Kb_Filter_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Filter_SourceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_filter_source(inputs)
	return __zh.kb_filter_source(inputs)
});
/**
* | output |
* | --- |
* | "No knowledge data" |
*
* @param {Kb_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_empty = /** @type {((inputs?: Kb_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_empty(inputs)
	return __zh.kb_empty(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company from the top-left first." |
*
* @param {Kb_Pick_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_pick_company_first = /** @type {((inputs?: Kb_Pick_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Pick_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_pick_company_first(inputs)
	return __zh.kb_pick_company_first(inputs)
});
/**
* | output |
* | --- |
* | "Knowledge load failed: {message}" |
*
* @param {Kb_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_load_error = /** @type {((inputs: Kb_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_load_error(inputs)
	return __zh.kb_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Kb_Menu_EditInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_menu_edit = /** @type {((inputs?: Kb_Menu_EditInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Menu_EditInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_menu_edit(inputs)
	return __zh.kb_menu_edit(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Kb_Menu_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_menu_delete = /** @type {((inputs?: Kb_Menu_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Menu_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_menu_delete(inputs)
	return __zh.kb_menu_delete(inputs)
});
/**
* | output |
* | --- |
* | "Official Docs" |
*
* @param {Kb_Source_Official_DocInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_source_official_doc = /** @type {((inputs?: Kb_Source_Official_DocInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Source_Official_DocInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_source_official_doc(inputs)
	return __zh.kb_source_official_doc(inputs)
});
/**
* | output |
* | --- |
* | "Session Record" |
*
* @param {Kb_Source_Session_RecordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_source_session_record = /** @type {((inputs?: Kb_Source_Session_RecordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Source_Session_RecordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_source_session_record(inputs)
	return __zh.kb_source_session_record(inputs)
});
/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Kb_Source_ManualInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_source_manual = /** @type {((inputs?: Kb_Source_ManualInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Source_ManualInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_source_manual(inputs)
	return __zh.kb_source_manual(inputs)
});
/**
* | output |
* | --- |
* | "Untitled knowledge" |
*
* @param {Kb_Unknown_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_unknown_title = /** @type {((inputs?: Kb_Unknown_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Unknown_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_unknown_title(inputs)
	return __zh.kb_unknown_title(inputs)
});
/**
* | output |
* | --- |
* | "Collapse sidebar" |
*
* @param {Header_Collapse_SidebarInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_collapse_sidebar = /** @type {((inputs?: Header_Collapse_SidebarInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Collapse_SidebarInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_collapse_sidebar(inputs)
	return __zh.header_collapse_sidebar(inputs)
});
/**
* | output |
* | --- |
* | "Email Login" |
*
* @param {Header_Email_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_email_login = /** @type {((inputs?: Header_Email_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Email_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_email_login(inputs)
	return __zh.header_email_login(inputs)
});
/**
* | output |
* | --- |
* | "Loading auth" |
*
* @param {Header_Loading_AuthInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_loading_auth = /** @type {((inputs?: Header_Loading_AuthInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Loading_AuthInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_loading_auth(inputs)
	return __zh.header_loading_auth(inputs)
});
/**
* | output |
* | --- |
* | "Rows {start}-{end}, total {total}" |
*
* @param {Header_RowsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_rows = /** @type {((inputs: Header_RowsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_RowsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_rows(inputs)
	return __zh.header_rows(inputs)
});
/**
* | output |
* | --- |
* | "Previous page" |
*
* @param {Header_PrevInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_prev = /** @type {((inputs?: Header_PrevInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_PrevInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_prev(inputs)
	return __zh.header_prev(inputs)
});
/**
* | output |
* | --- |
* | "Next page" |
*
* @param {Header_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_next = /** @type {((inputs?: Header_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_next(inputs)
	return __zh.header_next(inputs)
});
/**
* | output |
* | --- |
* | "Open action menu" |
*
* @param {Header_Open_Action_MenuInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_open_action_menu = /** @type {((inputs?: Header_Open_Action_MenuInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Open_Action_MenuInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_open_action_menu(inputs)
	return __zh.header_open_action_menu(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Header_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_settings = /** @type {((inputs?: Header_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_settings(inputs)
	return __zh.header_settings(inputs)
});
/**
* | output |
* | --- |
* | "User avatar" |
*
* @param {Header_User_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_user_avatar_alt = /** @type {((inputs?: Header_User_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_User_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.header_user_avatar_alt(inputs)
	return __zh.header_user_avatar_alt(inputs)
});
/**
* | output |
* | --- |
* | "Title" |
*
* @param {Kb_Doc_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_title = /** @type {((inputs?: Kb_Doc_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_doc_title(inputs)
	return __zh.kb_doc_title(inputs)
});
/**
* | output |
* | --- |
* | "Generated Knowledge" |
*
* @param {Kb_Doc_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_generated_count = /** @type {((inputs?: Kb_Doc_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_doc_generated_count(inputs)
	return __zh.kb_doc_generated_count(inputs)
});
/**
* | output |
* | --- |
* | "Uploader" |
*
* @param {Kb_Doc_UploaderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_uploader = /** @type {((inputs?: Kb_Doc_UploaderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_UploaderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_doc_uploader(inputs)
	return __zh.kb_doc_uploader(inputs)
});
/**
* | output |
* | --- |
* | "Uploaded At" |
*
* @param {Kb_Doc_Uploaded_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_uploaded_at = /** @type {((inputs?: Kb_Doc_Uploaded_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_Uploaded_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_doc_uploaded_at(inputs)
	return __zh.kb_doc_uploaded_at(inputs)
});
/**
* | output |
* | --- |
* | "No document data" |
*
* @param {Kb_Docs_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_docs_empty = /** @type {((inputs?: Kb_Docs_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Docs_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_docs_empty(inputs)
	return __zh.kb_docs_empty(inputs)
});
/**
* | output |
* | --- |
* | "Upload Document" |
*
* @param {Kb_Upload_Doc_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_tab = /** @type {((inputs?: Kb_Upload_Doc_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_tab(inputs)
	return __zh.kb_upload_doc_tab(inputs)
});
/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Kb_Upload_Manual_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_manual_tab = /** @type {((inputs?: Kb_Upload_Manual_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Manual_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_manual_tab(inputs)
	return __zh.kb_upload_manual_tab(inputs)
});
/**
* | output |
* | --- |
* | "Please enter knowledge content" |
*
* @param {Kb_Upload_Manual_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_manual_placeholder = /** @type {((inputs?: Kb_Upload_Manual_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Manual_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_manual_placeholder(inputs)
	return __zh.kb_upload_manual_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Document upload will be wired to the upload endpoint next; manual mode is available now." |
*
* @param {Kb_Upload_Doc_TodoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_todo = /** @type {((inputs?: Kb_Upload_Doc_TodoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_TodoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_todo(inputs)
	return __zh.kb_upload_doc_todo(inputs)
});
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Kb_Upload_CancelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_cancel = /** @type {((inputs?: Kb_Upload_CancelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_CancelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_cancel(inputs)
	return __zh.kb_upload_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Kb_Upload_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_submit = /** @type {((inputs?: Kb_Upload_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_submit(inputs)
	return __zh.kb_upload_submit(inputs)
});
/**
* | output |
* | --- |
* | "Uploading..." |
*
* @param {Kb_UploadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_uploading = /** @type {((inputs?: Kb_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_uploading(inputs)
	return __zh.kb_uploading(inputs)
});
/**
* | output |
* | --- |
* | "Please enter content before uploading." |
*
* @param {Kb_Upload_Manual_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_manual_required = /** @type {((inputs?: Kb_Upload_Manual_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Manual_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_manual_required(inputs)
	return __zh.kb_upload_manual_required(inputs)
});
/**
* | output |
* | --- |
* | "Click to upload" |
*
* @param {Kb_Upload_Doc_ClickInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_click = /** @type {((inputs?: Kb_Upload_Doc_ClickInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_ClickInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_click(inputs)
	return __zh.kb_upload_doc_click(inputs)
});
/**
* | output |
* | --- |
* | "Or drag and drop files here" |
*
* @param {Kb_Upload_Doc_Drag_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_drag_hint = /** @type {((inputs?: Kb_Upload_Doc_Drag_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Drag_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_drag_hint(inputs)
	return __zh.kb_upload_doc_drag_hint(inputs)
});
/**
* | output |
* | --- |
* | "Supported file formats: pdf, doc, docx" |
*
* @param {Kb_Upload_Doc_Format_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_format_hint = /** @type {((inputs?: Kb_Upload_Doc_Format_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Format_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_format_hint(inputs)
	return __zh.kb_upload_doc_format_hint(inputs)
});
/**
* | output |
* | --- |
* | "Please select a document before uploading." |
*
* @param {Kb_Upload_Doc_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_required = /** @type {((inputs?: Kb_Upload_Doc_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_required(inputs)
	return __zh.kb_upload_doc_required(inputs)
});
/**
* | output |
* | --- |
* | "Upload succeeded but document_id is missing. Please try again." |
*
* @param {Kb_Upload_Doc_Missing_Document_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_missing_document_id = /** @type {((inputs?: Kb_Upload_Doc_Missing_Document_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Missing_Document_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_missing_document_id(inputs)
	return __zh.kb_upload_doc_missing_document_id(inputs)
});
/**
* | output |
* | --- |
* | "Document processing timed out. Please check status in Documents later." |
*
* @param {Kb_Upload_Doc_TimeoutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_timeout = /** @type {((inputs?: Kb_Upload_Doc_TimeoutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_TimeoutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_timeout(inputs)
	return __zh.kb_upload_doc_timeout(inputs)
});
/**
* | output |
* | --- |
* | "Document processing failed (status: {status})." |
*
* @param {Kb_Upload_Doc_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_failed = /** @type {((inputs: Kb_Upload_Doc_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_failed(inputs)
	return __zh.kb_upload_doc_failed(inputs)
});
/**
* | output |
* | --- |
* | "Selected: {name}" |
*
* @param {Kb_Upload_Doc_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_selected = /** @type {((inputs: Kb_Upload_Doc_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_doc_selected(inputs)
	return __zh.kb_upload_doc_selected(inputs)
});
/**
* | output |
* | --- |
* | "Edit Knowledge" |
*
* @param {Kb_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_title = /** @type {((inputs?: Kb_Edit_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_title(inputs)
	return __zh.kb_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Close edit modal" |
*
* @param {Kb_Edit_CloseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_close = /** @type {((inputs?: Kb_Edit_CloseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_CloseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_close(inputs)
	return __zh.kb_edit_close(inputs)
});
/**
* | output |
* | --- |
* | "Title" |
*
* @param {Kb_Edit_Label_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_label_title = /** @type {((inputs?: Kb_Edit_Label_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Label_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_label_title(inputs)
	return __zh.kb_edit_label_title(inputs)
});
/**
* | output |
* | --- |
* | "Content" |
*
* @param {Kb_Edit_Label_ContentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_label_content = /** @type {((inputs?: Kb_Edit_Label_ContentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Label_ContentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_label_content(inputs)
	return __zh.kb_edit_label_content(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Kb_Edit_SaveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_save = /** @type {((inputs?: Kb_Edit_SaveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_SaveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_save(inputs)
	return __zh.kb_edit_save(inputs)
});
/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Kb_Edit_SavingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_saving = /** @type {((inputs?: Kb_Edit_SavingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_SavingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_saving(inputs)
	return __zh.kb_edit_saving(inputs)
});
/**
* | output |
* | --- |
* | "No editable knowledge record found. Please try again." |
*
* @param {Kb_Edit_Missing_TargetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_missing_target = /** @type {((inputs?: Kb_Edit_Missing_TargetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Missing_TargetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_missing_target(inputs)
	return __zh.kb_edit_missing_target(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a title before saving." |
*
* @param {Kb_Edit_Title_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_title_required = /** @type {((inputs?: Kb_Edit_Title_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Title_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_title_required(inputs)
	return __zh.kb_edit_title_required(inputs)
});
/**
* | output |
* | --- |
* | "Please enter content before saving." |
*
* @param {Kb_Edit_Content_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_content_required = /** @type {((inputs?: Kb_Edit_Content_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Content_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_edit_content_required(inputs)
	return __zh.kb_edit_content_required(inputs)
});
/**
* | output |
* | --- |
* | "Status: {status}" |
*
* @param {Kb_Upload_Progress_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_progress_status = /** @type {((inputs: Kb_Upload_Progress_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Progress_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_upload_progress_status(inputs)
	return __zh.kb_upload_progress_status(inputs)
});
/**
* | output |
* | --- |
* | "Generated Knowledge ({count})" |
*
* @param {Kb_Result_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_generated_count = /** @type {((inputs: Kb_Result_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_generated_count(inputs)
	return __zh.kb_result_generated_count(inputs)
});
/**
* | output |
* | --- |
* | "Updated Knowledge ({count})" |
*
* @param {Kb_Result_Updated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_updated_count = /** @type {((inputs: Kb_Result_Updated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Updated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_updated_count(inputs)
	return __zh.kb_result_updated_count(inputs)
});
/**
* | output |
* | --- |
* | "Chunk #{index}" |
*
* @param {Kb_Result_Chunk_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_chunk_prefix = /** @type {((inputs: Kb_Result_Chunk_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Chunk_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_chunk_prefix(inputs)
	return __zh.kb_result_chunk_prefix(inputs)
});
/**
* | output |
* | --- |
* | "No result to display (Document ID: {document_id})" |
*
* @param {Kb_Result_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_empty = /** @type {((inputs: Kb_Result_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_empty(inputs)
	return __zh.kb_result_empty(inputs)
});
/**
* | output |
* | --- |
* | "Regenerate" |
*
* @param {Kb_Result_RegenerateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_regenerate = /** @type {((inputs?: Kb_Result_RegenerateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_RegenerateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_regenerate(inputs)
	return __zh.kb_result_regenerate(inputs)
});
/**
* | output |
* | --- |
* | "Regenerating..." |
*
* @param {Kb_Result_RegeneratingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_regenerating = /** @type {((inputs?: Kb_Result_RegeneratingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_RegeneratingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_regenerating(inputs)
	return __zh.kb_result_regenerating(inputs)
});
/**
* | output |
* | --- |
* | "Confirm" |
*
* @param {Kb_Result_ConfirmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_confirm = /** @type {((inputs?: Kb_Result_ConfirmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_ConfirmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.kb_result_confirm(inputs)
	return __zh.kb_result_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Document processing timeout" |
*
* @param {Knowledge_Doc_Processing_TimeoutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_doc_processing_timeout = /** @type {((inputs?: Knowledge_Doc_Processing_TimeoutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Doc_Processing_TimeoutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_doc_processing_timeout(inputs)
	return __zh.knowledge_doc_processing_timeout(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load document status" |
*
* @param {Knowledge_Document_Status_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_document_status_load_failed = /** @type {((inputs?: Knowledge_Document_Status_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Document_Status_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_document_status_load_failed(inputs)
	return __zh.knowledge_document_status_load_failed(inputs)
});
/**
* | output |
* | --- |
* | "{count} attempt(s)" |
*
* @param {Knowledge_Failed_Chunk_AttemptsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunk_attempts = /** @type {((inputs: Knowledge_Failed_Chunk_AttemptsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunk_AttemptsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunk_attempts(inputs)
	return __zh.knowledge_failed_chunk_attempts(inputs)
});
/**
* | output |
* | --- |
* | "Untitled chunk" |
*
* @param {Knowledge_Failed_Chunk_Heading_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunk_heading_fallback = /** @type {((inputs?: Knowledge_Failed_Chunk_Heading_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunk_Heading_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunk_heading_fallback(inputs)
	return __zh.knowledge_failed_chunk_heading_fallback(inputs)
});
/**
* | output |
* | --- |
* | "No failed chunks in this document" |
*
* @param {Knowledge_Failed_Chunks_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_empty = /** @type {((inputs?: Knowledge_Failed_Chunks_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunks_empty(inputs)
	return __zh.knowledge_failed_chunks_empty(inputs)
});
/**
* | output |
* | --- |
* | "Select all failed chunks" |
*
* @param {Knowledge_Failed_Chunks_Select_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_select_all = /** @type {((inputs?: Knowledge_Failed_Chunks_Select_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_Select_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunks_select_all(inputs)
	return __zh.knowledge_failed_chunks_select_all(inputs)
});
/**
* | output |
* | --- |
* | "{count} selected" |
*
* @param {Knowledge_Failed_Chunks_Selected_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_selected_count = /** @type {((inputs: Knowledge_Failed_Chunks_Selected_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_Selected_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunks_selected_count(inputs)
	return __zh.knowledge_failed_chunks_selected_count(inputs)
});
/**
* | output |
* | --- |
* | "Failed Chunks" |
*
* @param {Knowledge_Failed_Chunks_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_title = /** @type {((inputs?: Knowledge_Failed_Chunks_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_failed_chunks_title(inputs)
	return __zh.knowledge_failed_chunks_title(inputs)
});
/**
* | output |
* | --- |
* | "Retry all failed chunks" |
*
* @param {Knowledge_Retry_All_Failed_ChunksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_all_failed_chunks = /** @type {((inputs?: Knowledge_Retry_All_Failed_ChunksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_All_Failed_ChunksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retry_all_failed_chunks(inputs)
	return __zh.knowledge_retry_all_failed_chunks(inputs)
});
/**
* | output |
* | --- |
* | "Retry started for failed chunks in this document" |
*
* @param {Knowledge_Retry_Failed_Chunks_StartedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_failed_chunks_started = /** @type {((inputs?: Knowledge_Retry_Failed_Chunks_StartedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Failed_Chunks_StartedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retry_failed_chunks_started(inputs)
	return __zh.knowledge_retry_failed_chunks_started(inputs)
});
/**
* | output |
* | --- |
* | "Retry selected chunks" |
*
* @param {Knowledge_Retry_Selected_Failed_ChunksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_selected_failed_chunks = /** @type {((inputs?: Knowledge_Retry_Selected_Failed_ChunksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Selected_Failed_ChunksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retry_selected_failed_chunks(inputs)
	return __zh.knowledge_retry_selected_failed_chunks(inputs)
});
/**
* | output |
* | --- |
* | "Select failed chunks to retry first" |
*
* @param {Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_selected_failed_chunks_required = /** @type {((inputs?: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retry_selected_failed_chunks_required(inputs)
	return __zh.knowledge_retry_selected_failed_chunks_required(inputs)
});
/**
* | output |
* | --- |
* | "Retry started for {count} failed chunk(s)" |
*
* @param {Knowledge_Retry_Selected_Failed_Chunks_StartedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_selected_failed_chunks_started = /** @type {((inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Selected_Failed_Chunks_StartedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retry_selected_failed_chunks_started(inputs)
	return __zh.knowledge_retry_selected_failed_chunks_started(inputs)
});
/**
* | output |
* | --- |
* | "Retrying..." |
*
* @param {Knowledge_Retrying_Failed_ChunksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retrying_failed_chunks = /** @type {((inputs?: Knowledge_Retrying_Failed_ChunksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retrying_Failed_ChunksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_retrying_failed_chunks(inputs)
	return __zh.knowledge_retrying_failed_chunks(inputs)
});
/**
* | output |
* | --- |
* | "Status:" |
*
* @param {Knowledge_Upload_Progress_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_progress_prefix = /** @type {((inputs?: Knowledge_Upload_Progress_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Progress_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_progress_prefix(inputs)
	return __zh.knowledge_upload_progress_prefix(inputs)
});
/**
* | output |
* | --- |
* | "completed" |
*
* @param {Knowledge_Upload_Status_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_completed = /** @type {((inputs?: Knowledge_Upload_Status_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_status_completed(inputs)
	return __zh.knowledge_upload_status_completed(inputs)
});
/**
* | output |
* | --- |
* | "failed" |
*
* @param {Knowledge_Upload_Status_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_failed = /** @type {((inputs?: Knowledge_Upload_Status_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_status_failed(inputs)
	return __zh.knowledge_upload_status_failed(inputs)
});
/**
* | output |
* | --- |
* | "processing" |
*
* @param {Knowledge_Upload_Status_ProcessingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_processing = /** @type {((inputs?: Knowledge_Upload_Status_ProcessingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_ProcessingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_status_processing(inputs)
	return __zh.knowledge_upload_status_processing(inputs)
});
/**
* | output |
* | --- |
* | "uploading" |
*
* @param {Knowledge_Upload_Status_UploadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_uploading = /** @type {((inputs?: Knowledge_Upload_Status_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_status_uploading(inputs)
	return __zh.knowledge_upload_status_uploading(inputs)
});
/**
* | output |
* | --- |
* | "Company created successfully, but onboarding could not be initialized." |
*
* @param {Onboarding_Company_Init_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_init_error = /** @type {((inputs?: Onboarding_Company_Init_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Init_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_init_error(inputs)
	return __zh.onboarding_company_init_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load company information. Please try again later." |
*
* @param {Onboarding_Company_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_load_error = /** @type {((inputs?: Onboarding_Company_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_load_error(inputs)
	return __zh.onboarding_company_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Company name must be {min}-{max} characters." |
*
* @param {Onboarding_Company_Name_Length_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_name_length_error = /** @type {((inputs: Onboarding_Company_Name_Length_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Name_Length_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_name_length_error(inputs)
	return __zh.onboarding_company_name_length_error(inputs)
});
/**
* | output |
* | --- |
* | "Company name" |
*
* @param {Onboarding_Company_Name_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_name_label = /** @type {((inputs?: Onboarding_Company_Name_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Name_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_name_label(inputs)
	return __zh.onboarding_company_name_label(inputs)
});
/**
* | output |
* | --- |
* | "Enter company name" |
*
* @param {Onboarding_Company_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_name_placeholder = /** @type {((inputs?: Onboarding_Company_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_name_placeholder(inputs)
	return __zh.onboarding_company_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Company description (optional)" |
*
* @param {Onboarding_Company_Description_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_description_label = /** @type {((inputs?: Onboarding_Company_Description_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Description_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_description_label(inputs)
	return __zh.onboarding_company_description_label(inputs)
});
/**
* | output |
* | --- |
* | "Briefly describe your company and team." |
*
* @param {Onboarding_Company_Description_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_description_placeholder = /** @type {((inputs?: Onboarding_Company_Description_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Description_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_description_placeholder(inputs)
	return __zh.onboarding_company_description_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save company information. Please try again later." |
*
* @param {Onboarding_Company_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_save_error = /** @type {((inputs?: Onboarding_Company_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_save_error(inputs)
	return __zh.onboarding_company_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Company information saved." |
*
* @param {Onboarding_Company_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_saved = /** @type {((inputs?: Onboarding_Company_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_saved(inputs)
	return __zh.onboarding_company_saved(inputs)
});
/**
* | output |
* | --- |
* | "Complete your company profile first, then continue with your personal profile." |
*
* @param {Onboarding_Company_Setup_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_setup_subtitle = /** @type {((inputs?: Onboarding_Company_Setup_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Setup_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_setup_subtitle(inputs)
	return __zh.onboarding_company_setup_subtitle(inputs)
});
/**
* | output |
* | --- |
* | "Set up company information" |
*
* @param {Onboarding_Company_Setup_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_setup_title = /** @type {((inputs?: Onboarding_Company_Setup_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Setup_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_setup_title(inputs)
	return __zh.onboarding_company_setup_title(inputs)
});
/**
* | output |
* | --- |
* | "Create and continue" |
*
* @param {Onboarding_Company_Submit_Create_ContinueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_submit_create_continue = /** @type {((inputs?: Onboarding_Company_Submit_Create_ContinueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Submit_Create_ContinueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_submit_create_continue(inputs)
	return __zh.onboarding_company_submit_create_continue(inputs)
});
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Onboarding_Company_Submit_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_submit_next = /** @type {((inputs?: Onboarding_Company_Submit_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Submit_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_submit_next(inputs)
	return __zh.onboarding_company_submit_next(inputs)
});
/**
* | output |
* | --- |
* | "Company website (optional)" |
*
* @param {Onboarding_Company_Website_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_website_label = /** @type {((inputs?: Onboarding_Company_Website_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Website_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_website_label(inputs)
	return __zh.onboarding_company_website_label(inputs)
});
/**
* | output |
* | --- |
* | "Welcome to Lucius. Create your first workspace before continuing with your personal profile." |
*
* @param {Onboarding_Company_Welcome_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_welcome_subtitle = /** @type {((inputs?: Onboarding_Company_Welcome_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Welcome_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_welcome_subtitle(inputs)
	return __zh.onboarding_company_welcome_subtitle(inputs)
});
/**
* | output |
* | --- |
* | "Create your first workspace" |
*
* @param {Onboarding_Company_Welcome_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_welcome_title = /** @type {((inputs?: Onboarding_Company_Welcome_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Welcome_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_welcome_title(inputs)
	return __zh.onboarding_company_welcome_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load onboarding progress. Please try again later." |
*
* @param {Onboarding_Profile_Gate_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_profile_gate_error = /** @type {((inputs?: Onboarding_Profile_Gate_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Profile_Gate_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_profile_gate_error(inputs)
	return __zh.onboarding_profile_gate_error(inputs)
});
/**
* | output |
* | --- |
* | "Avatar file must be an image." |
*
* @param {Profile_Avatar_Must_Be_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_must_be_image = /** @type {((inputs?: Profile_Avatar_Must_Be_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Must_Be_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_avatar_must_be_image(inputs)
	return __zh.profile_avatar_must_be_image(inputs)
});
/**
* | output |
* | --- |
* | "Avatar preview" |
*
* @param {Profile_Avatar_Preview_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_preview_alt = /** @type {((inputs?: Profile_Avatar_Preview_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Preview_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_avatar_preview_alt(inputs)
	return __zh.profile_avatar_preview_alt(inputs)
});
/**
* | output |
* | --- |
* | "Avatar file must be smaller than {size}." |
*
* @param {Profile_Avatar_Size_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_size_limit = /** @type {((inputs: Profile_Avatar_Size_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Size_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_avatar_size_limit(inputs)
	return __zh.profile_avatar_size_limit(inputs)
});
/**
* | output |
* | --- |
* | "Choose avatar" |
*
* @param {Profile_Choose_AvatarInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_choose_avatar = /** @type {((inputs?: Profile_Choose_AvatarInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Choose_AvatarInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_choose_avatar(inputs)
	return __zh.profile_choose_avatar(inputs)
});
/**
* | output |
* | --- |
* | "Nickname must be {min}-{max} characters." |
*
* @param {Profile_Display_Name_Length_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_display_name_length_error = /** @type {((inputs: Profile_Display_Name_Length_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Display_Name_Length_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_display_name_length_error(inputs)
	return __zh.profile_display_name_length_error(inputs)
});
/**
* | output |
* | --- |
* | "Enter your nickname" |
*
* @param {Profile_Enter_NicknameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_enter_nickname = /** @type {((inputs?: Profile_Enter_NicknameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Enter_NicknameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_enter_nickname(inputs)
	return __zh.profile_enter_nickname(inputs)
});
/**
* | output |
* | --- |
* | "Failed to initialize profile. Please try again later." |
*
* @param {Profile_Init_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_init_failed = /** @type {((inputs?: Profile_Init_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Init_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_init_failed(inputs)
	return __zh.profile_init_failed(inputs)
});
/**
* | output |
* | --- |
* | "{min}-{max} characters. Nicknames must be unique within the same workspace." |
*
* @param {Profile_Nickname_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_hint = /** @type {((inputs: Profile_Nickname_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_nickname_hint(inputs)
	return __zh.profile_nickname_hint(inputs)
});
/**
* | output |
* | --- |
* | "Nickname" |
*
* @param {Profile_Nickname_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_label = /** @type {((inputs?: Profile_Nickname_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_nickname_label(inputs)
	return __zh.profile_nickname_label(inputs)
});
/**
* | output |
* | --- |
* | "your nickname" |
*
* @param {Profile_Nickname_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_placeholder = /** @type {((inputs?: Profile_Nickname_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_nickname_placeholder(inputs)
	return __zh.profile_nickname_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a nickname." |
*
* @param {Profile_Required_Display_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_required_display_name = /** @type {((inputs?: Profile_Required_Display_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Required_Display_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_required_display_name(inputs)
	return __zh.profile_required_display_name(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save profile. Please try again later." |
*
* @param {Profile_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_save_error = /** @type {((inputs?: Profile_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_save_error(inputs)
	return __zh.profile_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Profile saved successfully." |
*
* @param {Profile_Save_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_save_success = /** @type {((inputs?: Profile_Save_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Save_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_save_success(inputs)
	return __zh.profile_save_success(inputs)
});
/**
* | output |
* | --- |
* | "Platform accounts" |
*
* @param {Profile_Platform_Accounts_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_accounts_title = /** @type {((inputs?: Profile_Platform_Accounts_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Accounts_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_platform_accounts_title(inputs)
	return __zh.profile_platform_accounts_title(inputs)
});
/**
* | output |
* | --- |
* | "Connect" |
*
* @param {Profile_Platform_Account_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_connect = /** @type {((inputs?: Profile_Platform_Account_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_platform_account_connect(inputs)
	return __zh.profile_platform_account_connect(inputs)
});
/**
* | output |
* | --- |
* | "Disconnect" |
*
* @param {Profile_Platform_Account_DisconnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_disconnect = /** @type {((inputs?: Profile_Platform_Account_DisconnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_DisconnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_platform_account_disconnect(inputs)
	return __zh.profile_platform_account_disconnect(inputs)
});
/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Profile_Platform_Account_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_unavailable = /** @type {((inputs?: Profile_Platform_Account_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_platform_account_unavailable(inputs)
	return __zh.profile_platform_account_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Discord" |
*
* @param {Platform_DiscordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_discord = /** @type {((inputs?: Platform_DiscordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_DiscordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_discord(inputs)
	return __zh.platform_discord(inputs)
});
/**
* | output |
* | --- |
* | "Feishu" |
*
* @param {Platform_FeishuInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_feishu = /** @type {((inputs?: Platform_FeishuInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_FeishuInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_feishu(inputs)
	return __zh.platform_feishu(inputs)
});
/**
* | output |
* | --- |
* | "Slack" |
*
* @param {Platform_SlackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_slack = /** @type {((inputs?: Platform_SlackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_SlackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_slack(inputs)
	return __zh.platform_slack(inputs)
});
/**
* | output |
* | --- |
* | "Telegram" |
*
* @param {Platform_TelegramInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_telegram = /** @type {((inputs?: Platform_TelegramInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_TelegramInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_telegram(inputs)
	return __zh.platform_telegram(inputs)
});
/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Platform_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_unknown = /** @type {((inputs?: Platform_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_unknown(inputs)
	return __zh.platform_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Admin" |
*
* @param {Role_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_admin = /** @type {((inputs?: Role_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_admin(inputs)
	return __zh.role_admin(inputs)
});
/**
* | output |
* | --- |
* | "Assistant" |
*
* @param {Role_AssistantInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_assistant = /** @type {((inputs?: Role_AssistantInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_AssistantInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_assistant(inputs)
	return __zh.role_assistant(inputs)
});
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
	if (locale === "en") return __en.role_bot(inputs)
	return __zh.role_bot(inputs)
});
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
	if (locale === "en") return __en.role_lucius(inputs)
	return __zh.role_lucius(inputs)
});
/**
* | output |
* | --- |
* | "Staff" |
*
* @param {Role_StaffInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_staff = /** @type {((inputs?: Role_StaffInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_StaffInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_staff(inputs)
	return __zh.role_staff(inputs)
});
/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Role_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_unknown = /** @type {((inputs?: Role_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_unknown(inputs)
	return __zh.role_unknown(inputs)
});
/**
* | output |
* | --- |
* | "User" |
*
* @param {Role_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_user = /** @type {((inputs?: Role_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_user(inputs)
	return __zh.role_user(inputs)
});
/**
* | output |
* | --- |
* | "Back to app" |
*
* @param {Settings_Back_To_AppInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_back_to_app = /** @type {((inputs?: Settings_Back_To_AppInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Back_To_AppInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_back_to_app(inputs)
	return __zh.settings_back_to_app(inputs)
});
/**
* | output |
* | --- |
* | "Event Settings" |
*
* @param {Settings_Nav_Event_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_event_settings = /** @type {((inputs?: Settings_Nav_Event_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Event_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_event_settings(inputs)
	return __zh.settings_nav_event_settings(inputs)
});
/**
* | output |
* | --- |
* | "Management" |
*
* @param {Settings_Nav_ManagementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_management = /** @type {((inputs?: Settings_Nav_ManagementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_ManagementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_management(inputs)
	return __zh.settings_nav_management(inputs)
});
/**
* | output |
* | --- |
* | "Member Management" |
*
* @param {Settings_Nav_Member_ManagementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_member_management = /** @type {((inputs?: Settings_Nav_Member_ManagementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Member_ManagementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_member_management(inputs)
	return __zh.settings_nav_member_management(inputs)
});
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Settings_Nav_PackageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_package = /** @type {((inputs?: Settings_Nav_PackageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_PackageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_package(inputs)
	return __zh.settings_nav_package(inputs)
});
/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Settings_Nav_Profile_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_profile_settings = /** @type {((inputs?: Settings_Nav_Profile_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Profile_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_profile_settings(inputs)
	return __zh.settings_nav_profile_settings(inputs)
});
/**
* | output |
* | --- |
* | "Usage History" |
*
* @param {Settings_Nav_Usage_HistoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_usage_history = /** @type {((inputs?: Settings_Nav_Usage_HistoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Usage_HistoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_usage_history(inputs)
	return __zh.settings_nav_usage_history(inputs)
});
/**
* | output |
* | --- |
* | "Communities" |
*
* @param {Settings_Nav_User_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_user_communities = /** @type {((inputs?: Settings_Nav_User_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_User_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_user_communities(inputs)
	return __zh.settings_nav_user_communities(inputs)
});
/**
* | output |
* | --- |
* | "Workgroup Settings" |
*
* @param {Settings_Nav_Workgroup_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_workgroup_settings = /** @type {((inputs?: Settings_Nav_Workgroup_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Workgroup_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_nav_workgroup_settings(inputs)
	return __zh.settings_nav_workgroup_settings(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first." |
*
* @param {Settings_Select_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_select_company_first = /** @type {((inputs?: Settings_Select_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Select_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_select_company_first(inputs)
	return __zh.settings_select_company_first(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_title = /** @type {((inputs?: Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_title(inputs)
	return __zh.settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Add" |
*
* @param {Common_AddInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_add = /** @type {((inputs?: Common_AddInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_AddInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_add(inputs)
	return __zh.common_add(inputs)
});
/**
* | output |
* | --- |
* | "{count} day(s) ago" |
*
* @param {Common_Days_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_days_ago = /** @type {((inputs: Common_Days_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Days_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_days_ago(inputs)
	return __zh.common_days_ago(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Common_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_delete = /** @type {((inputs?: Common_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_delete(inputs)
	return __zh.common_delete(inputs)
});
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Common_EditInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_edit = /** @type {((inputs?: Common_EditInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_EditInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_edit(inputs)
	return __zh.common_edit(inputs)
});
/**
* | output |
* | --- |
* | "None" |
*
* @param {Common_NoneInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_none = /** @type {((inputs?: Common_NoneInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NoneInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_none(inputs)
	return __zh.common_none(inputs)
});
/**
* | output |
* | --- |
* | "Open" |
*
* @param {Common_OpenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_open = /** @type {((inputs?: Common_OpenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_OpenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_open(inputs)
	return __zh.common_open(inputs)
});
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Common_PreviousInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_previous = /** @type {((inputs?: Common_PreviousInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PreviousInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_previous(inputs)
	return __zh.common_previous(inputs)
});
/**
* | output |
* | --- |
* | "Refresh" |
*
* @param {Common_RefreshInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_refresh = /** @type {((inputs?: Common_RefreshInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RefreshInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_refresh(inputs)
	return __zh.common_refresh(inputs)
});
/**
* | output |
* | --- |
* | "Refreshing" |
*
* @param {Common_RefreshingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_refreshing = /** @type {((inputs?: Common_RefreshingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RefreshingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_refreshing(inputs)
	return __zh.common_refreshing(inputs)
});
/**
* | output |
* | --- |
* | "Unknown user" |
*
* @param {Common_Unknown_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_unknown_user = /** @type {((inputs?: Common_Unknown_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Unknown_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_unknown_user(inputs)
	return __zh.common_unknown_user(inputs)
});
/**
* | output |
* | --- |
* | "Website" |
*
* @param {Platform_WebsiteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_website = /** @type {((inputs?: Platform_WebsiteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_WebsiteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.platform_website(inputs)
	return __zh.platform_website(inputs)
});
/**
* | output |
* | --- |
* | "Member" |
*
* @param {Role_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_member = /** @type {((inputs?: Role_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_member(inputs)
	return __zh.role_member(inputs)
});
/**
* | output |
* | --- |
* | "Owner" |
*
* @param {Role_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_owner = /** @type {((inputs?: Role_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.role_owner(inputs)
	return __zh.role_owner(inputs)
});
/**
* | output |
* | --- |
* | "Workgroup Settings" |
*
* @param {Workspace_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_settings_title = /** @type {((inputs?: Workspace_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_settings_title(inputs)
	return __zh.workspace_settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Configurable" |
*
* @param {Workspace_State_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_ready = /** @type {((inputs?: Workspace_State_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_state_ready(inputs)
	return __zh.workspace_state_ready(inputs)
});
/**
* | output |
* | --- |
* | "Needs connection" |
*
* @param {Workspace_State_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_needs_connection = /** @type {((inputs?: Workspace_State_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_state_needs_connection(inputs)
	return __zh.workspace_state_needs_connection(inputs)
});
/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Workspace_State_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_unavailable = /** @type {((inputs?: Workspace_State_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_state_unavailable(inputs)
	return __zh.workspace_state_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "No available channels on this platform yet." |
*
* @param {Workspace_Empty_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_ready = /** @type {((inputs?: Workspace_Empty_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_empty_ready(inputs)
	return __zh.workspace_empty_ready(inputs)
});
/**
* | output |
* | --- |
* | "Workgroup settings are not available for this platform yet." |
*
* @param {Workspace_Empty_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_unavailable = /** @type {((inputs?: Workspace_Empty_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_empty_unavailable(inputs)
	return __zh.workspace_empty_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Finish the platform connection first, then come back to choose workgroups." |
*
* @param {Workspace_Empty_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_needs_connection = /** @type {((inputs?: Workspace_Empty_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_empty_needs_connection(inputs)
	return __zh.workspace_empty_needs_connection(inputs)
});
/**
* | output |
* | --- |
* | "Disconnected" |
*
* @param {Workspace_StaleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_stale = /** @type {((inputs?: Workspace_StaleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_StaleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_stale(inputs)
	return __zh.workspace_stale(inputs)
});
/**
* | output |
* | --- |
* | "Saving" |
*
* @param {Workspace_Save_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_save_pending = /** @type {((inputs?: Workspace_Save_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Save_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_save_pending(inputs)
	return __zh.workspace_save_pending(inputs)
});
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
	if (locale === "en") return __en.workspace_badge(inputs)
	return __zh.workspace_badge(inputs)
});
/**
* | output |
* | --- |
* | "Remove from workgroup" |
*
* @param {Workspace_RemoveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_remove = /** @type {((inputs?: Workspace_RemoveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_RemoveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_remove(inputs)
	return __zh.workspace_remove(inputs)
});
/**
* | output |
* | --- |
* | "Set as workgroup" |
*
* @param {Workspace_SetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_set = /** @type {((inputs?: Workspace_SetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_SetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_set(inputs)
	return __zh.workspace_set(inputs)
});
/**
* | output |
* | --- |
* | "Read only" |
*
* @param {Workspace_ReadonlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_readonly = /** @type {((inputs?: Workspace_ReadonlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_ReadonlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_readonly(inputs)
	return __zh.workspace_readonly(inputs)
});
/**
* | output |
* | --- |
* | "Go to platform settings" |
*
* @param {Workspace_Navigate_Platform_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_navigate_platform_settings = /** @type {((inputs?: Workspace_Navigate_Platform_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Navigate_Platform_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_navigate_platform_settings(inputs)
	return __zh.workspace_navigate_platform_settings(inputs)
});
/**
* | output |
* | --- |
* | "{count} workgroup(s)" |
*
* @param {Workspace_Selected_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_selected_count = /** @type {((inputs: Workspace_Selected_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Selected_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_selected_count(inputs)
	return __zh.workspace_selected_count(inputs)
});
/**
* | output |
* | --- |
* | "{name} was set as a workgroup." |
*
* @param {Workspace_Add_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_add_success = /** @type {((inputs: Workspace_Add_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Add_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_add_success(inputs)
	return __zh.workspace_add_success(inputs)
});
/**
* | output |
* | --- |
* | "{name} was removed from workgroups." |
*
* @param {Workspace_Remove_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_remove_success = /** @type {((inputs: Workspace_Remove_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Remove_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_remove_success(inputs)
	return __zh.workspace_remove_success(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company at the top of the page first." |
*
* @param {Workspace_Select_Company_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_select_company_error = /** @type {((inputs?: Workspace_Select_Company_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Select_Company_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_select_company_error(inputs)
	return __zh.workspace_select_company_error(inputs)
});
/**
* | output |
* | --- |
* | "Only Owner/Admin can modify workgroup settings." |
*
* @param {Workspace_Permission_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_error = /** @type {((inputs?: Workspace_Permission_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_permission_error(inputs)
	return __zh.workspace_permission_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save workgroup settings. Please try again later." |
*
* @param {Workspace_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_save_error = /** @type {((inputs?: Workspace_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_save_error(inputs)
	return __zh.workspace_save_error(inputs)
});
/**
* | output |
* | --- |
* | "{count} workgroup channel(s) selected" |
*
* @param {Workspace_Summary_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_summary_selected = /** @type {((inputs: Workspace_Summary_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Summary_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_summary_selected(inputs)
	return __zh.workspace_summary_selected(inputs)
});
/**
* | output |
* | --- |
* | "Channels become available only after the platform is connected. Each platform can have multiple workgroups." |
*
* @param {Workspace_Summary_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_summary_description = /** @type {((inputs?: Workspace_Summary_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Summary_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_summary_description(inputs)
	return __zh.workspace_summary_description(inputs)
});
/**
* | output |
* | --- |
* | "Current permission: editable" |
*
* @param {Workspace_Permission_EditableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_editable = /** @type {((inputs?: Workspace_Permission_EditableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_EditableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_permission_editable(inputs)
	return __zh.workspace_permission_editable(inputs)
});
/**
* | output |
* | --- |
* | "Current permission: read only" |
*
* @param {Workspace_Permission_ReadonlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_readonly = /** @type {((inputs?: Workspace_Permission_ReadonlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_ReadonlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_permission_readonly(inputs)
	return __zh.workspace_permission_readonly(inputs)
});
/**
* | output |
* | --- |
* | "Only Owner/Admin can modify workgroup settings; Members can view the current configuration." |
*
* @param {Workspace_Member_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_member_readonly_hint = /** @type {((inputs?: Workspace_Member_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Member_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workspace_member_readonly_hint(inputs)
	return __zh.workspace_member_readonly_hint(inputs)
});
/**
* | output |
* | --- |
* | "Feishu" |
*
* @param {Feishu_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_settings_title = /** @type {((inputs?: Feishu_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_settings_title(inputs)
	return __zh.feishu_settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Group Chat" |
*
* @param {Feishu_Default_Chat_TypeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_default_chat_type = /** @type {((inputs?: Feishu_Default_Chat_TypeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Default_Chat_TypeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_default_chat_type(inputs)
	return __zh.feishu_default_chat_type(inputs)
});
/**
* | output |
* | --- |
* | "{count} Feishu workgroup candidate(s) found" |
*
* @param {Feishu_Discovered_CandidatesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_discovered_candidates = /** @type {((inputs: Feishu_Discovered_CandidatesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Discovered_CandidatesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_discovered_candidates(inputs)
	return __zh.feishu_discovered_candidates(inputs)
});
/**
* | output |
* | --- |
* | "No available Feishu workgroups yet" |
*
* @param {Feishu_No_Available_CandidatesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_no_available_candidates = /** @type {((inputs?: Feishu_No_Available_CandidatesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_No_Available_CandidatesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_no_available_candidates(inputs)
	return __zh.feishu_no_available_candidates(inputs)
});
/**
* | output |
* | --- |
* | "Feishu groups have been synced to the channel library. Go back to Workgroup Settings to mark them as workgroups." |
*
* @param {Feishu_Synced_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_synced_hint = /** @type {((inputs?: Feishu_Synced_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Synced_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_synced_hint(inputs)
	return __zh.feishu_synced_hint(inputs)
});
/**
* | output |
* | --- |
* | "Complete the Feishu integration first. Once groups are synced in, options will appear here and in Workgroup Settings." |
*
* @param {Feishu_Manage_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_manage_hint = /** @type {((inputs?: Feishu_Manage_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Manage_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_manage_hint(inputs)
	return __zh.feishu_manage_hint(inputs)
});
/**
* | output |
* | --- |
* | "This account is read only. You can view synced Feishu groups here." |
*
* @param {Feishu_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_readonly_hint = /** @type {((inputs?: Feishu_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_readonly_hint(inputs)
	return __zh.feishu_readonly_hint(inputs)
});
/**
* | output |
* | --- |
* | "No synced Feishu groups yet." |
*
* @param {Feishu_Empty_SyncedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_empty_synced = /** @type {((inputs?: Feishu_Empty_SyncedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Empty_SyncedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_empty_synced(inputs)
	return __zh.feishu_empty_synced(inputs)
});
/**
* | output |
* | --- |
* | "Add Bot" |
*
* @param {Feishu_Bot_Add_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_add_button = /** @type {((inputs?: Feishu_Bot_Add_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Add_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_add_button(inputs)
	return __zh.feishu_bot_add_button(inputs)
});
/**
* | output |
* | --- |
* | "Connected Bots" |
*
* @param {Feishu_Bot_Summary_Connected_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_connected_title = /** @type {((inputs?: Feishu_Bot_Summary_Connected_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Connected_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_connected_title(inputs)
	return __zh.feishu_bot_summary_connected_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} bot(s) configured" |
*
* @param {Feishu_Bot_Summary_Connected_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_connected_hint = /** @type {((inputs: Feishu_Bot_Summary_Connected_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Connected_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_connected_hint(inputs)
	return __zh.feishu_bot_summary_connected_hint(inputs)
});
/**
* | output |
* | --- |
* | "Default Bot" |
*
* @param {Feishu_Bot_Summary_Default_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_default_title = /** @type {((inputs?: Feishu_Bot_Summary_Default_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Default_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_default_title(inputs)
	return __zh.feishu_bot_summary_default_title(inputs)
});
/**
* | output |
* | --- |
* | "No default bot yet" |
*
* @param {Feishu_Bot_Summary_Default_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_default_hint = /** @type {((inputs?: Feishu_Bot_Summary_Default_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Default_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_default_hint(inputs)
	return __zh.feishu_bot_summary_default_hint(inputs)
});
/**
* | output |
* | --- |
* | "Channels Bound" |
*
* @param {Feishu_Bot_Summary_Channels_Bound_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_channels_bound_title = /** @type {((inputs?: Feishu_Bot_Summary_Channels_Bound_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Channels_Bound_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_channels_bound_title(inputs)
	return __zh.feishu_bot_summary_channels_bound_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} unassigned channel(s)" |
*
* @param {Feishu_Bot_Summary_Channels_Bound_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_channels_bound_hint = /** @type {((inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Channels_Bound_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_channels_bound_hint(inputs)
	return __zh.feishu_bot_summary_channels_bound_hint(inputs)
});
/**
* | output |
* | --- |
* | "Last Error Bots" |
*
* @param {Feishu_Bot_Summary_Last_Error_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_last_error_title = /** @type {((inputs?: Feishu_Bot_Summary_Last_Error_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Last_Error_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_last_error_title(inputs)
	return __zh.feishu_bot_summary_last_error_title(inputs)
});
/**
* | output |
* | --- |
* | "Bots that currently need attention" |
*
* @param {Feishu_Bot_Summary_Last_Error_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_last_error_hint = /** @type {((inputs?: Feishu_Bot_Summary_Last_Error_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Last_Error_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_summary_last_error_hint(inputs)
	return __zh.feishu_bot_summary_last_error_hint(inputs)
});
/**
* | output |
* | --- |
* | "Only Owner/Admin can manage bots; Members can view the current routing." |
*
* @param {Feishu_Bot_Member_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_member_readonly_hint = /** @type {((inputs?: Feishu_Bot_Member_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Member_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_member_readonly_hint(inputs)
	return __zh.feishu_bot_member_readonly_hint(inputs)
});
/**
* | output |
* | --- |
* | "No Feishu bots yet" |
*
* @param {Feishu_Bot_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_title = /** @type {((inputs?: Feishu_Bot_Empty_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_empty_title(inputs)
	return __zh.feishu_bot_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Add a bot first, then verify, restart and assign channels from this panel." |
*
* @param {Feishu_Bot_Empty_Manage_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_manage_hint = /** @type {((inputs?: Feishu_Bot_Empty_Manage_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_Manage_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_empty_manage_hint(inputs)
	return __zh.feishu_bot_empty_manage_hint(inputs)
});
/**
* | output |
* | --- |
* | "No Feishu bot has been configured for this company yet." |
*
* @param {Feishu_Bot_Empty_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_readonly_hint = /** @type {((inputs?: Feishu_Bot_Empty_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_empty_readonly_hint(inputs)
	return __zh.feishu_bot_empty_readonly_hint(inputs)
});
/**
* | output |
* | --- |
* | "Add Feishu Bot" |
*
* @param {Feishu_Bot_Dialog_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_dialog_create_title = /** @type {((inputs?: Feishu_Bot_Dialog_Create_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Dialog_Create_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_dialog_create_title(inputs)
	return __zh.feishu_bot_dialog_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Edit Feishu Bot" |
*
* @param {Feishu_Bot_Dialog_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_dialog_edit_title = /** @type {((inputs?: Feishu_Bot_Dialog_Edit_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Dialog_Edit_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_dialog_edit_title(inputs)
	return __zh.feishu_bot_dialog_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Bot name" |
*
* @param {Feishu_Bot_Form_Name_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_name_label = /** @type {((inputs?: Feishu_Bot_Form_Name_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Name_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_name_label(inputs)
	return __zh.feishu_bot_form_name_label(inputs)
});
/**
* | output |
* | --- |
* | "Support Bot" |
*
* @param {Feishu_Bot_Form_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_name_placeholder = /** @type {((inputs?: Feishu_Bot_Form_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_name_placeholder(inputs)
	return __zh.feishu_bot_form_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "App ID" |
*
* @param {Feishu_Bot_Form_App_Id_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_id_label = /** @type {((inputs?: Feishu_Bot_Form_App_Id_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Id_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_id_label(inputs)
	return __zh.feishu_bot_form_app_id_label(inputs)
});
/**
* | output |
* | --- |
* | "cli_xxx" |
*
* @param {Feishu_Bot_Form_App_Id_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_id_placeholder = /** @type {((inputs?: Feishu_Bot_Form_App_Id_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Id_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_id_placeholder(inputs)
	return __zh.feishu_bot_form_app_id_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "App Secret" |
*
* @param {Feishu_Bot_Form_App_Secret_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_secret_label = /** @type {((inputs?: Feishu_Bot_Form_App_Secret_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Secret_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_secret_label(inputs)
	return __zh.feishu_bot_form_app_secret_label(inputs)
});
/**
* | output |
* | --- |
* | "Paste the app secret" |
*
* @param {Feishu_Bot_Form_App_Secret_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_secret_placeholder = /** @type {((inputs?: Feishu_Bot_Form_App_Secret_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Secret_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_secret_placeholder(inputs)
	return __zh.feishu_bot_form_app_secret_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Set as default bot" |
*
* @param {Feishu_Bot_Form_Default_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_default_label = /** @type {((inputs?: Feishu_Bot_Form_Default_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Default_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_default_label(inputs)
	return __zh.feishu_bot_form_default_label(inputs)
});
/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Feishu_Bot_Form_Enabled_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_enabled_label = /** @type {((inputs?: Feishu_Bot_Form_Enabled_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Enabled_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_enabled_label(inputs)
	return __zh.feishu_bot_form_enabled_label(inputs)
});
/**
* | output |
* | --- |
* | "Rotate secret" |
*
* @param {Feishu_Bot_Form_Rotate_Secret_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_label = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotate_secret_label(inputs)
	return __zh.feishu_bot_form_rotate_secret_label(inputs)
});
/**
* | output |
* | --- |
* | "Only enter a new secret when you need to replace the current one." |
*
* @param {Feishu_Bot_Form_Rotate_Secret_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_hint = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotate_secret_hint(inputs)
	return __zh.feishu_bot_form_rotate_secret_hint(inputs)
});
/**
* | output |
* | --- |
* | "Rotate" |
*
* @param {Feishu_Bot_Form_Rotate_Secret_ShowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_show = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_ShowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_ShowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotate_secret_show(inputs)
	return __zh.feishu_bot_form_rotate_secret_show(inputs)
});
/**
* | output |
* | --- |
* | "Cancel rotate" |
*
* @param {Feishu_Bot_Form_Rotate_Secret_HideInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_hide = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_HideInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_HideInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotate_secret_hide(inputs)
	return __zh.feishu_bot_form_rotate_secret_hide(inputs)
});
/**
* | output |
* | --- |
* | "New App Secret" |
*
* @param {Feishu_Bot_Form_Rotated_Secret_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_label = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotated_secret_label(inputs)
	return __zh.feishu_bot_form_rotated_secret_label(inputs)
});
/**
* | output |
* | --- |
* | "Paste the replacement secret" |
*
* @param {Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_placeholder = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotated_secret_placeholder(inputs)
	return __zh.feishu_bot_form_rotated_secret_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a bot name." |
*
* @param {Feishu_Bot_Form_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_name_required = /** @type {((inputs?: Feishu_Bot_Form_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_name_required(inputs)
	return __zh.feishu_bot_form_name_required(inputs)
});
/**
* | output |
* | --- |
* | "Please enter an App ID." |
*
* @param {Feishu_Bot_Form_App_Id_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_id_required = /** @type {((inputs?: Feishu_Bot_Form_App_Id_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Id_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_id_required(inputs)
	return __zh.feishu_bot_form_app_id_required(inputs)
});
/**
* | output |
* | --- |
* | "Please enter an App Secret." |
*
* @param {Feishu_Bot_Form_App_Secret_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_secret_required = /** @type {((inputs?: Feishu_Bot_Form_App_Secret_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Secret_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_app_secret_required(inputs)
	return __zh.feishu_bot_form_app_secret_required(inputs)
});
/**
* | output |
* | --- |
* | "Please enter the replacement secret." |
*
* @param {Feishu_Bot_Form_Rotated_Secret_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_required = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_rotated_secret_required(inputs)
	return __zh.feishu_bot_form_rotated_secret_required(inputs)
});
/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Feishu_Bot_Form_SubmittingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_submitting = /** @type {((inputs?: Feishu_Bot_Form_SubmittingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_SubmittingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_form_submitting(inputs)
	return __zh.feishu_bot_form_submitting(inputs)
});
/**
* | output |
* | --- |
* | "Create Bot" |
*
* @param {Feishu_Bot_CreateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_create = /** @type {((inputs?: Feishu_Bot_CreateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_CreateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_create(inputs)
	return __zh.feishu_bot_create(inputs)
});
/**
* | output |
* | --- |
* | "Default" |
*
* @param {Feishu_Bot_Default_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_default_badge = /** @type {((inputs?: Feishu_Bot_Default_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Default_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_default_badge(inputs)
	return __zh.feishu_bot_default_badge(inputs)
});
/**
* | output |
* | --- |
* | "Active" |
*
* @param {Feishu_Bot_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_active = /** @type {((inputs?: Feishu_Bot_Status_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_status_active(inputs)
	return __zh.feishu_bot_status_active(inputs)
});
/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Feishu_Bot_Status_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_disabled = /** @type {((inputs?: Feishu_Bot_Status_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_status_disabled(inputs)
	return __zh.feishu_bot_status_disabled(inputs)
});
/**
* | output |
* | --- |
* | "Error" |
*
* @param {Feishu_Bot_Status_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_error = /** @type {((inputs?: Feishu_Bot_Status_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_status_error(inputs)
	return __zh.feishu_bot_status_error(inputs)
});
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Feishu_Bot_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_pending = /** @type {((inputs?: Feishu_Bot_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_status_pending(inputs)
	return __zh.feishu_bot_status_pending(inputs)
});
/**
* | output |
* | --- |
* | "Verify" |
*
* @param {Feishu_Bot_Action_VerifyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_verify = /** @type {((inputs?: Feishu_Bot_Action_VerifyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_VerifyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_verify(inputs)
	return __zh.feishu_bot_action_verify(inputs)
});
/**
* | output |
* | --- |
* | "Verifying..." |
*
* @param {Feishu_Bot_Action_VerifyingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_verifying = /** @type {((inputs?: Feishu_Bot_Action_VerifyingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_VerifyingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_verifying(inputs)
	return __zh.feishu_bot_action_verifying(inputs)
});
/**
* | output |
* | --- |
* | "Restart" |
*
* @param {Feishu_Bot_Action_RestartInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_restart = /** @type {((inputs?: Feishu_Bot_Action_RestartInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_RestartInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_restart(inputs)
	return __zh.feishu_bot_action_restart(inputs)
});
/**
* | output |
* | --- |
* | "Restarting..." |
*
* @param {Feishu_Bot_Action_RestartingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_restarting = /** @type {((inputs?: Feishu_Bot_Action_RestartingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_RestartingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_restarting(inputs)
	return __zh.feishu_bot_action_restarting(inputs)
});
/**
* | output |
* | --- |
* | "Enable" |
*
* @param {Feishu_Bot_Action_EnableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_enable = /** @type {((inputs?: Feishu_Bot_Action_EnableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_EnableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_enable(inputs)
	return __zh.feishu_bot_action_enable(inputs)
});
/**
* | output |
* | --- |
* | "Disable" |
*
* @param {Feishu_Bot_Action_DisableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_disable = /** @type {((inputs?: Feishu_Bot_Action_DisableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_DisableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_disable(inputs)
	return __zh.feishu_bot_action_disable(inputs)
});
/**
* | output |
* | --- |
* | "Updating..." |
*
* @param {Feishu_Bot_Action_UpdatingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_updating = /** @type {((inputs?: Feishu_Bot_Action_UpdatingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_UpdatingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_action_updating(inputs)
	return __zh.feishu_bot_action_updating(inputs)
});
/**
* | output |
* | --- |
* | "Last verified" |
*
* @param {Feishu_Bot_Meta_Verified_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_verified_at = /** @type {((inputs?: Feishu_Bot_Meta_Verified_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_Verified_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_meta_verified_at(inputs)
	return __zh.feishu_bot_meta_verified_at(inputs)
});
/**
* | output |
* | --- |
* | "Last connected" |
*
* @param {Feishu_Bot_Meta_Connected_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_connected_at = /** @type {((inputs?: Feishu_Bot_Meta_Connected_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_Connected_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_meta_connected_at(inputs)
	return __zh.feishu_bot_meta_connected_at(inputs)
});
/**
* | output |
* | --- |
* | "Last heartbeat" |
*
* @param {Feishu_Bot_Meta_Heartbeat_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_heartbeat_at = /** @type {((inputs?: Feishu_Bot_Meta_Heartbeat_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_Heartbeat_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_meta_heartbeat_at(inputs)
	return __zh.feishu_bot_meta_heartbeat_at(inputs)
});
/**
* | output |
* | --- |
* | "Last event" |
*
* @param {Feishu_Bot_Meta_Event_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_event_at = /** @type {((inputs?: Feishu_Bot_Meta_Event_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_Event_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_meta_event_at(inputs)
	return __zh.feishu_bot_meta_event_at(inputs)
});
/**
* | output |
* | --- |
* | "Never" |
*
* @param {Feishu_Bot_Meta_NeverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_never = /** @type {((inputs?: Feishu_Bot_Meta_NeverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_NeverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_meta_never(inputs)
	return __zh.feishu_bot_meta_never(inputs)
});
/**
* | output |
* | --- |
* | "Last error" |
*
* @param {Feishu_Bot_Last_Error_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_last_error_label = /** @type {((inputs?: Feishu_Bot_Last_Error_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Last_Error_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_last_error_label(inputs)
	return __zh.feishu_bot_last_error_label(inputs)
});
/**
* | output |
* | --- |
* | "Assigned channels" |
*
* @param {Feishu_Bot_Assigned_Channels_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_title = /** @type {((inputs?: Feishu_Bot_Assigned_Channels_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_assigned_channels_title(inputs)
	return __zh.feishu_bot_assigned_channels_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} channel(s)" |
*
* @param {Feishu_Bot_Assigned_Channels_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_count = /** @type {((inputs: Feishu_Bot_Assigned_Channels_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_assigned_channels_count(inputs)
	return __zh.feishu_bot_assigned_channels_count(inputs)
});
/**
* | output |
* | --- |
* | "No channels are currently routed to this bot." |
*
* @param {Feishu_Bot_Assigned_Channels_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_empty = /** @type {((inputs?: Feishu_Bot_Assigned_Channels_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_assigned_channels_empty(inputs)
	return __zh.feishu_bot_assigned_channels_empty(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot created." |
*
* @param {Feishu_Bot_Create_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_create_success = /** @type {((inputs?: Feishu_Bot_Create_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Create_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_create_success(inputs)
	return __zh.feishu_bot_create_success(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot updated." |
*
* @param {Feishu_Bot_Update_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_update_success = /** @type {((inputs?: Feishu_Bot_Update_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Update_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_update_success(inputs)
	return __zh.feishu_bot_update_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save the Feishu bot." |
*
* @param {Feishu_Bot_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_save_error = /** @type {((inputs?: Feishu_Bot_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_save_error(inputs)
	return __zh.feishu_bot_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot verification started." |
*
* @param {Feishu_Bot_Verify_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_verify_success = /** @type {((inputs?: Feishu_Bot_Verify_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Verify_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_verify_success(inputs)
	return __zh.feishu_bot_verify_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to verify the Feishu bot." |
*
* @param {Feishu_Bot_Verify_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_verify_error = /** @type {((inputs?: Feishu_Bot_Verify_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Verify_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_verify_error(inputs)
	return __zh.feishu_bot_verify_error(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot enabled." |
*
* @param {Feishu_Bot_Enable_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_enable_success = /** @type {((inputs?: Feishu_Bot_Enable_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Enable_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_enable_success(inputs)
	return __zh.feishu_bot_enable_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to enable the Feishu bot." |
*
* @param {Feishu_Bot_Enable_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_enable_error = /** @type {((inputs?: Feishu_Bot_Enable_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Enable_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_enable_error(inputs)
	return __zh.feishu_bot_enable_error(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot restart started." |
*
* @param {Feishu_Bot_Restart_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_success = /** @type {((inputs?: Feishu_Bot_Restart_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_restart_success(inputs)
	return __zh.feishu_bot_restart_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to restart the Feishu bot." |
*
* @param {Feishu_Bot_Restart_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_error = /** @type {((inputs?: Feishu_Bot_Restart_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_restart_error(inputs)
	return __zh.feishu_bot_restart_error(inputs)
});
/**
* | output |
* | --- |
* | "Feishu bot disabled." |
*
* @param {Feishu_Bot_Disable_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_success = /** @type {((inputs?: Feishu_Bot_Disable_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_disable_success(inputs)
	return __zh.feishu_bot_disable_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to disable the Feishu bot." |
*
* @param {Feishu_Bot_Disable_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_error = /** @type {((inputs?: Feishu_Bot_Disable_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_disable_error(inputs)
	return __zh.feishu_bot_disable_error(inputs)
});
/**
* | output |
* | --- |
* | "Restart this bot?" |
*
* @param {Feishu_Bot_Restart_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_confirm_title = /** @type {((inputs?: Feishu_Bot_Restart_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_restart_confirm_title(inputs)
	return __zh.feishu_bot_restart_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "The connection will be restarted to recover runtime state." |
*
* @param {Feishu_Bot_Restart_Confirm_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_restart_confirm_description = /** @type {((inputs?: Feishu_Bot_Restart_Confirm_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Restart_Confirm_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_restart_confirm_description(inputs)
	return __zh.feishu_bot_restart_confirm_description(inputs)
});
/**
* | output |
* | --- |
* | "Disable this bot?" |
*
* @param {Feishu_Bot_Disable_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_confirm_title = /** @type {((inputs?: Feishu_Bot_Disable_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_disable_confirm_title(inputs)
	return __zh.feishu_bot_disable_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Disabled bots will stop handling channels until you enable them again." |
*
* @param {Feishu_Bot_Disable_Confirm_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_confirm_description = /** @type {((inputs?: Feishu_Bot_Disable_Confirm_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_Confirm_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feishu_bot_disable_confirm_description(inputs)
	return __zh.feishu_bot_disable_confirm_description(inputs)
});
/**
* | output |
* | --- |
* | "Usage History" |
*
* @param {Billing_Usage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_usage_title = /** @type {((inputs?: Billing_Usage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Usage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_usage_title(inputs)
	return __zh.billing_usage_title(inputs)
});
/**
* | output |
* | --- |
* | "Current billing period" |
*
* @param {Billing_Current_PeriodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_period = /** @type {((inputs?: Billing_Current_PeriodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_PeriodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_current_period(inputs)
	return __zh.billing_current_period(inputs)
});
/**
* | output |
* | --- |
* | "Period key: {key}" |
*
* @param {Billing_Period_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_key = /** @type {((inputs: Billing_Period_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_period_key(inputs)
	return __zh.billing_period_key(inputs)
});
/**
* | output |
* | --- |
* | "The period key will appear on the detailed ledger page later." |
*
* @param {Billing_Period_Key_LaterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_key_later = /** @type {((inputs?: Billing_Period_Key_LaterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_Key_LaterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_period_key_later(inputs)
	return __zh.billing_period_key_later(inputs)
});
/**
* | output |
* | --- |
* | "Actions used this month" |
*
* @param {Billing_Used_Actions_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_used_actions_title = /** @type {((inputs?: Billing_Used_Actions_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Used_Actions_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_used_actions_title(inputs)
	return __zh.billing_used_actions_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} action(s) have been blocked by the quota policy." |
*
* @param {Billing_Blocked_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_blocked_actions = /** @type {((inputs: Billing_Blocked_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Blocked_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_blocked_actions(inputs)
	return __zh.billing_blocked_actions(inputs)
});
/**
* | output |
* | --- |
* | "No actions are currently blocked by stop-service." |
*
* @param {Billing_No_Blocked_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_blocked_actions = /** @type {((inputs?: Billing_No_Blocked_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Blocked_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_no_blocked_actions(inputs)
	return __zh.billing_no_blocked_actions(inputs)
});
/**
* | output |
* | --- |
* | "Generated overage" |
*
* @param {Billing_Overage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_title = /** @type {((inputs?: Billing_Overage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_overage_title(inputs)
	return __zh.billing_overage_title(inputs)
});
/**
* | output |
* | --- |
* | "Projected overage fee {amount}" |
*
* @param {Billing_Projected_OverageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_projected_overage = /** @type {((inputs: Billing_Projected_OverageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Projected_OverageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_projected_overage(inputs)
	return __zh.billing_projected_overage(inputs)
});
/**
* | output |
* | --- |
* | "No overage fee has been generated in the current billing period." |
*
* @param {Billing_No_Overage_YetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_overage_yet = /** @type {((inputs?: Billing_No_Overage_YetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Overage_YetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_no_overage_yet(inputs)
	return __zh.billing_no_overage_yet(inputs)
});
/**
* | output |
* | --- |
* | "Current status" |
*
* @param {Billing_State_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_state_title = /** @type {((inputs?: Billing_State_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_State_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_state_title(inputs)
	return __zh.billing_state_title(inputs)
});
/**
* | output |
* | --- |
* | "Projected invoice" |
*
* @param {Billing_Estimated_Invoice_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_estimated_invoice_title = /** @type {((inputs?: Billing_Estimated_Invoice_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Estimated_Invoice_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_estimated_invoice_title(inputs)
	return __zh.billing_estimated_invoice_title(inputs)
});
/**
* | output |
* | --- |
* | "Auto charge" |
*
* @param {Billing_Auto_ChargeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_auto_charge = /** @type {((inputs?: Billing_Auto_ChargeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Auto_ChargeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_auto_charge(inputs)
	return __zh.billing_auto_charge(inputs)
});
/**
* | output |
* | --- |
* | "Stop service" |
*
* @param {Billing_Stop_ServiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stop_service = /** @type {((inputs?: Billing_Stop_ServiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stop_ServiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_stop_service(inputs)
	return __zh.billing_stop_service(inputs)
});
/**
* | output |
* | --- |
* | "Stripe invoices" |
*
* @param {Billing_Stripe_Invoices_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_invoices_title = /** @type {((inputs?: Billing_Stripe_Invoices_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_Invoices_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_stripe_invoices_title(inputs)
	return __zh.billing_stripe_invoices_title(inputs)
});
/**
* | output |
* | --- |
* | "View hosted invoices directly, or download PDFs and receipts." |
*
* @param {Billing_Stripe_Invoices_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_invoices_hint = /** @type {((inputs?: Billing_Stripe_Invoices_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_Invoices_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_stripe_invoices_hint(inputs)
	return __zh.billing_stripe_invoices_hint(inputs)
});
/**
* | output |
* | --- |
* | "No exportable Stripe invoices yet." |
*
* @param {Billing_Stripe_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_empty = /** @type {((inputs?: Billing_Stripe_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_stripe_empty(inputs)
	return __zh.billing_stripe_empty(inputs)
});
/**
* | output |
* | --- |
* | "Current period snapshot" |
*
* @param {Billing_Snapshot_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_title = /** @type {((inputs?: Billing_Snapshot_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_snapshot_title(inputs)
	return __zh.billing_snapshot_title(inputs)
});
/**
* | output |
* | --- |
* | "For internal verification only. This does not replace the official Stripe invoice." |
*
* @param {Billing_Snapshot_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_hint = /** @type {((inputs?: Billing_Snapshot_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_snapshot_hint(inputs)
	return __zh.billing_snapshot_hint(inputs)
});
/**
* | output |
* | --- |
* | "Export current period CSV snapshot" |
*
* @param {Billing_Snapshot_Export_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_export_title = /** @type {((inputs?: Billing_Snapshot_Export_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_Export_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_snapshot_export_title(inputs)
	return __zh.billing_snapshot_export_title(inputs)
});
/**
* | output |
* | --- |
* | "Export CSV snapshot" |
*
* @param {Billing_Snapshot_ExportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_export = /** @type {((inputs?: Billing_Snapshot_ExportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_ExportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_snapshot_export(inputs)
	return __zh.billing_snapshot_export(inputs)
});
/**
* | output |
* | --- |
* | "Item" |
*
* @param {Billing_Table_ProjectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_project = /** @type {((inputs?: Billing_Table_ProjectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_ProjectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_table_project(inputs)
	return __zh.billing_table_project(inputs)
});
/**
* | output |
* | --- |
* | "Quantity" |
*
* @param {Billing_Table_QuantityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_quantity = /** @type {((inputs?: Billing_Table_QuantityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_QuantityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_table_quantity(inputs)
	return __zh.billing_table_quantity(inputs)
});
/**
* | output |
* | --- |
* | "Unit price" |
*
* @param {Billing_Table_Unit_PriceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_unit_price = /** @type {((inputs?: Billing_Table_Unit_PriceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_Unit_PriceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_table_unit_price(inputs)
	return __zh.billing_table_unit_price(inputs)
});
/**
* | output |
* | --- |
* | "Amount" |
*
* @param {Billing_Table_AmountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_amount = /** @type {((inputs?: Billing_Table_AmountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_AmountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_table_amount(inputs)
	return __zh.billing_table_amount(inputs)
});
/**
* | output |
* | --- |
* | "Projected total" |
*
* @param {Billing_Estimated_TotalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_estimated_total = /** @type {((inputs?: Billing_Estimated_TotalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Estimated_TotalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_estimated_total(inputs)
	return __zh.billing_estimated_total(inputs)
});
/**
* | output |
* | --- |
* | "The current period export can be archived directly." |
*
* @param {Billing_Period_Export_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_export_hint = /** @type {((inputs?: Billing_Period_Export_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_Export_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_period_export_hint(inputs)
	return __zh.billing_period_export_hint(inputs)
});
/**
* | output |
* | --- |
* | "The current period billing details have been exported." |
*
* @param {Billing_Export_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_success = /** @type {((inputs?: Billing_Export_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_success(inputs)
	return __zh.billing_export_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to export billing details. Please try again later." |
*
* @param {Billing_Export_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_error = /** @type {((inputs?: Billing_Export_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_error(inputs)
	return __zh.billing_export_error(inputs)
});
/**
* | output |
* | --- |
* | "Paid" |
*
* @param {Billing_Invoice_Status_PaidInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_paid = /** @type {((inputs?: Billing_Invoice_Status_PaidInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_PaidInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_paid(inputs)
	return __zh.billing_invoice_status_paid(inputs)
});
/**
* | output |
* | --- |
* | "Open" |
*
* @param {Billing_Invoice_Status_OpenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_open = /** @type {((inputs?: Billing_Invoice_Status_OpenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_OpenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_open(inputs)
	return __zh.billing_invoice_status_open(inputs)
});
/**
* | output |
* | --- |
* | "Voided" |
*
* @param {Billing_Invoice_Status_VoidInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_void = /** @type {((inputs?: Billing_Invoice_Status_VoidInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_VoidInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_void(inputs)
	return __zh.billing_invoice_status_void(inputs)
});
/**
* | output |
* | --- |
* | "Uncollectible" |
*
* @param {Billing_Invoice_Status_UncollectibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_uncollectible = /** @type {((inputs?: Billing_Invoice_Status_UncollectibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_UncollectibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_uncollectible(inputs)
	return __zh.billing_invoice_status_uncollectible(inputs)
});
/**
* | output |
* | --- |
* | "Draft" |
*
* @param {Billing_Invoice_Status_DraftInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_draft = /** @type {((inputs?: Billing_Invoice_Status_DraftInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_DraftInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_draft(inputs)
	return __zh.billing_invoice_status_draft(inputs)
});
/**
* | output |
* | --- |
* | "Unknown status" |
*
* @param {Billing_Invoice_Status_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_unknown = /** @type {((inputs?: Billing_Invoice_Status_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_invoice_status_unknown(inputs)
	return __zh.billing_invoice_status_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Created on {date}" |
*
* @param {Billing_Created_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_created_on = /** @type {((inputs: Billing_Created_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Created_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_created_on(inputs)
	return __zh.billing_created_on(inputs)
});
/**
* | output |
* | --- |
* | "Paid on {date}" |
*
* @param {Billing_Paid_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_paid_on = /** @type {((inputs: Billing_Paid_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Paid_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_paid_on(inputs)
	return __zh.billing_paid_on(inputs)
});
/**
* | output |
* | --- |
* | "View invoice" |
*
* @param {Billing_View_InvoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_view_invoice = /** @type {((inputs?: Billing_View_InvoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_View_InvoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_view_invoice(inputs)
	return __zh.billing_view_invoice(inputs)
});
/**
* | output |
* | --- |
* | "Download invoice" |
*
* @param {Billing_Download_InvoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_download_invoice = /** @type {((inputs?: Billing_Download_InvoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Download_InvoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_download_invoice(inputs)
	return __zh.billing_download_invoice(inputs)
});
/**
* | output |
* | --- |
* | "Download receipt" |
*
* @param {Billing_Download_ReceiptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_download_receipt = /** @type {((inputs?: Billing_Download_ReceiptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Download_ReceiptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_download_receipt(inputs)
	return __zh.billing_download_receipt(inputs)
});
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Billing_Plan_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_title = /** @type {((inputs?: Billing_Plan_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_plan_title(inputs)
	return __zh.billing_plan_title(inputs)
});
/**
* | output |
* | --- |
* | "Free" |
*
* @param {Billing_Display_Free_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_free_active = /** @type {((inputs?: Billing_Display_Free_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Free_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_free_active(inputs)
	return __zh.billing_display_free_active(inputs)
});
/**
* | output |
* | --- |
* | "Free limit reached" |
*
* @param {Billing_Display_Free_Limit_ReachedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_free_limit_reached = /** @type {((inputs?: Billing_Display_Free_Limit_ReachedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Free_Limit_ReachedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_free_limit_reached(inputs)
	return __zh.billing_display_free_limit_reached(inputs)
});
/**
* | output |
* | --- |
* | "Basic trial" |
*
* @param {Billing_Display_Basic_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_basic_trial = /** @type {((inputs?: Billing_Display_Basic_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Basic_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_basic_trial(inputs)
	return __zh.billing_display_basic_trial(inputs)
});
/**
* | output |
* | --- |
* | "Basic active" |
*
* @param {Billing_Display_Basic_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_basic_active = /** @type {((inputs?: Billing_Display_Basic_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Basic_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_basic_active(inputs)
	return __zh.billing_display_basic_active(inputs)
});
/**
* | output |
* | --- |
* | "Basic set to cancel" |
*
* @param {Billing_Display_Basic_CancelingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_basic_canceling = /** @type {((inputs?: Billing_Display_Basic_CancelingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Basic_CancelingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_basic_canceling(inputs)
	return __zh.billing_display_basic_canceling(inputs)
});
/**
* | output |
* | --- |
* | "Pro trial" |
*
* @param {Billing_Display_Pro_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_trial = /** @type {((inputs?: Billing_Display_Pro_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_pro_trial(inputs)
	return __zh.billing_display_pro_trial(inputs)
});
/**
* | output |
* | --- |
* | "Pro active" |
*
* @param {Billing_Display_Pro_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_active = /** @type {((inputs?: Billing_Display_Pro_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_pro_active(inputs)
	return __zh.billing_display_pro_active(inputs)
});
/**
* | output |
* | --- |
* | "Pro set to cancel" |
*
* @param {Billing_Display_Pro_CancelingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_canceling = /** @type {((inputs?: Billing_Display_Pro_CancelingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_CancelingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_pro_canceling(inputs)
	return __zh.billing_display_pro_canceling(inputs)
});
/**
* | output |
* | --- |
* | "Promo Basic" |
*
* @param {Billing_Display_Promo_Only_BasicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_promo_only_basic = /** @type {((inputs?: Billing_Display_Promo_Only_BasicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Promo_Only_BasicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_promo_only_basic(inputs)
	return __zh.billing_display_promo_only_basic(inputs)
});
/**
* | output |
* | --- |
* | "Payment issue" |
*
* @param {Billing_Display_Past_DueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_past_due = /** @type {((inputs?: Billing_Display_Past_DueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Past_DueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_past_due(inputs)
	return __zh.billing_display_past_due(inputs)
});
/**
* | output |
* | --- |
* | "Expired" |
*
* @param {Billing_Display_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_expired = /** @type {((inputs?: Billing_Display_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_display_expired(inputs)
	return __zh.billing_display_expired(inputs)
});
/**
* | output |
* | --- |
* | "Trial ends on {date}" |
*
* @param {Billing_Trial_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_trial_ends_on = /** @type {((inputs: Billing_Trial_Ends_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Trial_Ends_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_trial_ends_on(inputs)
	return __zh.billing_trial_ends_on(inputs)
});
/**
* | output |
* | --- |
* | "Trial in progress" |
*
* @param {Billing_TrialingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_trialing = /** @type {((inputs?: Billing_TrialingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_TrialingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_trialing(inputs)
	return __zh.billing_trialing(inputs)
});
/**
* | output |
* | --- |
* | "Ends on {date}" |
*
* @param {Billing_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_ends_on = /** @type {((inputs: Billing_Ends_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Ends_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_ends_on(inputs)
	return __zh.billing_ends_on(inputs)
});
/**
* | output |
* | --- |
* | "Stops after the current billing period" |
*
* @param {Billing_Stop_After_PeriodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stop_after_period = /** @type {((inputs?: Billing_Stop_After_PeriodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stop_After_PeriodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_stop_after_period(inputs)
	return __zh.billing_stop_after_period(inputs)
});
/**
* | output |
* | --- |
* | "Free quota limit reached" |
*
* @param {Billing_Limit_ReachedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_limit_reached = /** @type {((inputs?: Billing_Limit_ReachedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Limit_ReachedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_limit_reached(inputs)
	return __zh.billing_limit_reached(inputs)
});
/**
* | output |
* | --- |
* | "Current billing period is normal" |
*
* @param {Billing_Current_Period_NormalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_period_normal = /** @type {((inputs?: Billing_Current_Period_NormalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_Period_NormalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_current_period_normal(inputs)
	return __zh.billing_current_period_normal(inputs)
});
/**
* | output |
* | --- |
* | "Next billing {date}" |
*
* @param {Billing_Next_BillingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_next_billing = /** @type {((inputs: Billing_Next_BillingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Next_BillingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_next_billing(inputs)
	return __zh.billing_next_billing(inputs)
});
/**
* | output |
* | --- |
* | "Current workspace" |
*
* @param {Billing_Current_WorkspaceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_workspace = /** @type {((inputs?: Billing_Current_WorkspaceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_WorkspaceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_current_workspace(inputs)
	return __zh.billing_current_workspace(inputs)
});
/**
* | output |
* | --- |
* | "Start Basic trial" |
*
* @param {Billing_Start_Basic_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_basic_trial = /** @type {((inputs?: Billing_Start_Basic_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_Basic_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_start_basic_trial(inputs)
	return __zh.billing_start_basic_trial(inputs)
});
/**
* | output |
* | --- |
* | "Start Pro trial" |
*
* @param {Billing_Start_Pro_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_pro_trial = /** @type {((inputs?: Billing_Start_Pro_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_Pro_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_start_pro_trial(inputs)
	return __zh.billing_start_pro_trial(inputs)
});
/**
* | output |
* | --- |
* | "Manage payment method" |
*
* @param {Billing_Manage_Payment_MethodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_manage_payment_method = /** @type {((inputs?: Billing_Manage_Payment_MethodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Manage_Payment_MethodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_manage_payment_method(inputs)
	return __zh.billing_manage_payment_method(inputs)
});
/**
* | output |
* | --- |
* | "Billing account" |
*
* @param {Billing_Account_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_account_label = /** @type {((inputs?: Billing_Account_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Account_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_account_label(inputs)
	return __zh.billing_account_label(inputs)
});
/**
* | output |
* | --- |
* | "Projected" |
*
* @param {Billing_Metric_ProjectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_projected = /** @type {((inputs?: Billing_Metric_ProjectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_ProjectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_metric_projected(inputs)
	return __zh.billing_metric_projected(inputs)
});
/**
* | output |
* | --- |
* | "Admins" |
*
* @param {Billing_Metric_AdminsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_admins = /** @type {((inputs?: Billing_Metric_AdminsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_AdminsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_metric_admins(inputs)
	return __zh.billing_metric_admins(inputs)
});
/**
* | output |
* | --- |
* | "Platforms" |
*
* @param {Billing_Metric_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_platforms = /** @type {((inputs?: Billing_Metric_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_metric_platforms(inputs)
	return __zh.billing_metric_platforms(inputs)
});
/**
* | output |
* | --- |
* | "Overage" |
*
* @param {Billing_Metric_OverageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_overage = /** @type {((inputs?: Billing_Metric_OverageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_OverageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_metric_overage(inputs)
	return __zh.billing_metric_overage(inputs)
});
/**
* | output |
* | --- |
* | "{amount} / month" |
*
* @param {Billing_Monthly_PriceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_monthly_price = /** @type {((inputs: Billing_Monthly_PriceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Monthly_PriceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_monthly_price(inputs)
	return __zh.billing_monthly_price(inputs)
});
/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Billing_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_actions_label = /** @type {((inputs?: Billing_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_actions_label(inputs)
	return __zh.billing_actions_label(inputs)
});
/**
* | output |
* | --- |
* | "/ {count} included this month" |
*
* @param {Billing_Actions_Included_MonthInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_actions_included_month = /** @type {((inputs: Billing_Actions_Included_MonthInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Actions_Included_MonthInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_actions_included_month(inputs)
	return __zh.billing_actions_included_month(inputs)
});
/**
* | output |
* | --- |
* | "{count} overage action(s), projected {amount}" |
*
* @param {Billing_Overage_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_summary = /** @type {((inputs: Billing_Overage_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_overage_summary(inputs)
	return __zh.billing_overage_summary(inputs)
});
/**
* | output |
* | --- |
* | "No overage fee currently" |
*
* @param {Billing_No_Overage_FeeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_overage_fee = /** @type {((inputs?: Billing_No_Overage_FeeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Overage_FeeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_no_overage_fee(inputs)
	return __zh.billing_no_overage_fee(inputs)
});
/**
* | output |
* | --- |
* | "Usage {percent}%" |
*
* @param {Billing_Usage_RateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_usage_rate = /** @type {((inputs: Billing_Usage_RateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Usage_RateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_usage_rate(inputs)
	return __zh.billing_usage_rate(inputs)
});
/**
* | output |
* | --- |
* | "Extra admins {count}" |
*
* @param {Billing_Extra_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_extra_admin = /** @type {((inputs: Billing_Extra_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Extra_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_extra_admin(inputs)
	return __zh.billing_extra_admin(inputs)
});
/**
* | output |
* | --- |
* | "No extra admins" |
*
* @param {Billing_No_Extra_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_extra_admin = /** @type {((inputs?: Billing_No_Extra_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Extra_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_no_extra_admin(inputs)
	return __zh.billing_no_extra_admin(inputs)
});
/**
* | output |
* | --- |
* | "Extra platforms {count}" |
*
* @param {Billing_Extra_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_extra_platform = /** @type {((inputs: Billing_Extra_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Extra_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_extra_platform(inputs)
	return __zh.billing_extra_platform(inputs)
});
/**
* | output |
* | --- |
* | "No extra platforms" |
*
* @param {Billing_No_Extra_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_extra_platform = /** @type {((inputs?: Billing_No_Extra_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Extra_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_no_extra_platform(inputs)
	return __zh.billing_no_extra_platform(inputs)
});
/**
* | output |
* | --- |
* | "Overage policy" |
*
* @param {Billing_Overage_Policy_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_policy_title = /** @type {((inputs?: Billing_Overage_Policy_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Policy_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_overage_policy_title(inputs)
	return __zh.billing_overage_policy_title(inputs)
});
/**
* | output |
* | --- |
* | "How to handle usage after the included quota is reached" |
*
* @param {Billing_Overage_Policy_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_policy_subtitle = /** @type {((inputs?: Billing_Overage_Policy_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Policy_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_overage_policy_subtitle(inputs)
	return __zh.billing_overage_policy_subtitle(inputs)
});
/**
* | output |
* | --- |
* | "Free plan is fixed to stop service when the quota is reached." |
*
* @param {Billing_Free_Fixed_Stop_ServiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_free_fixed_stop_service = /** @type {((inputs?: Billing_Free_Fixed_Stop_ServiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Free_Fixed_Stop_ServiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_free_fixed_stop_service(inputs)
	return __zh.billing_free_fixed_stop_service(inputs)
});
/**
* | output |
* | --- |
* | "Stop service" |
*
* @param {Billing_Policy_Stop_Service_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_stop_service_title = /** @type {((inputs?: Billing_Policy_Stop_Service_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Stop_Service_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_policy_stop_service_title(inputs)
	return __zh.billing_policy_stop_service_title(inputs)
});
/**
* | output |
* | --- |
* | "Stop new billable actions after the included quota is reached." |
*
* @param {Billing_Policy_Stop_Service_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_stop_service_desc = /** @type {((inputs?: Billing_Policy_Stop_Service_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Stop_Service_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_policy_stop_service_desc(inputs)
	return __zh.billing_policy_stop_service_desc(inputs)
});
/**
* | output |
* | --- |
* | "Auto charge" |
*
* @param {Billing_Policy_Auto_Charge_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_auto_charge_title = /** @type {((inputs?: Billing_Policy_Auto_Charge_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Auto_Charge_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_policy_auto_charge_title(inputs)
	return __zh.billing_policy_auto_charge_title(inputs)
});
/**
* | output |
* | --- |
* | "Automatically bill overages within the current billing period." |
*
* @param {Billing_Policy_Auto_Charge_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_auto_charge_desc = /** @type {((inputs?: Billing_Policy_Auto_Charge_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Auto_Charge_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_policy_auto_charge_desc(inputs)
	return __zh.billing_policy_auto_charge_desc(inputs)
});
/**
* | output |
* | --- |
* | "Monthly overage cap (USD)" |
*
* @param {Billing_Monthly_Overage_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_monthly_overage_cap = /** @type {((inputs?: Billing_Monthly_Overage_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Monthly_Overage_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_monthly_overage_cap(inputs)
	return __zh.billing_monthly_overage_cap(inputs)
});
/**
* | output |
* | --- |
* | "e.g. 500" |
*
* @param {Billing_Example_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_example_cap = /** @type {((inputs?: Billing_Example_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Example_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_example_cap(inputs)
	return __zh.billing_example_cap(inputs)
});
/**
* | output |
* | --- |
* | "Save policy" |
*
* @param {Billing_Save_PolicyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_save_policy = /** @type {((inputs?: Billing_Save_PolicyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Save_PolicyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_save_policy(inputs)
	return __zh.billing_save_policy(inputs)
});
/**
* | output |
* | --- |
* | "Current plan" |
*
* @param {Billing_Current_PlanInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_plan = /** @type {((inputs?: Billing_Current_PlanInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_PlanInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_current_plan(inputs)
	return __zh.billing_current_plan(inputs)
});
/**
* | output |
* | --- |
* | "{amount} / action" |
*
* @param {Billing_Overage_Per_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_per_action = /** @type {((inputs: Billing_Overage_Per_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Per_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_overage_per_action(inputs)
	return __zh.billing_overage_per_action(inputs)
});
/**
* | output |
* | --- |
* | "Unsupported" |
*
* @param {Billing_UnsupportedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_unsupported = /** @type {((inputs?: Billing_UnsupportedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_UnsupportedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_unsupported(inputs)
	return __zh.billing_unsupported(inputs)
});
/**
* | output |
* | --- |
* | "Platform add-on {platform} / month · Admin add-on {admin} / month" |
*
* @param {Billing_Addon_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_addon_summary = /** @type {((inputs: Billing_Addon_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Addon_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_addon_summary(inputs)
	return __zh.billing_addon_summary(inputs)
});
/**
* | output |
* | --- |
* | "Start trial" |
*
* @param {Billing_Start_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_trial = /** @type {((inputs?: Billing_Start_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_start_trial(inputs)
	return __zh.billing_start_trial(inputs)
});
/**
* | output |
* | --- |
* | "Member Management" |
*
* @param {Member_Management_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_title = /** @type {((inputs?: Member_Management_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_title(inputs)
	return __zh.member_management_title(inputs)
});
/**
* | output |
* | --- |
* | "Add member" |
*
* @param {Member_Management_Add_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_add_member = /** @type {((inputs?: Member_Management_Add_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Add_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_add_member(inputs)
	return __zh.member_management_add_member(inputs)
});
/**
* | output |
* | --- |
* | "ID" |
*
* @param {Member_Management_Table_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_id = /** @type {((inputs?: Member_Management_Table_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_table_id(inputs)
	return __zh.member_management_table_id(inputs)
});
/**
* | output |
* | --- |
* | "Platforms" |
*
* @param {Member_Management_Table_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_platforms = /** @type {((inputs?: Member_Management_Table_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_table_platforms(inputs)
	return __zh.member_management_table_platforms(inputs)
});
/**
* | output |
* | --- |
* | "Role" |
*
* @param {Member_Management_Table_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_role = /** @type {((inputs?: Member_Management_Table_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_table_role(inputs)
	return __zh.member_management_table_role(inputs)
});
/**
* | output |
* | --- |
* | "Recent activity" |
*
* @param {Member_Management_Table_Recent_ActivityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_recent_activity = /** @type {((inputs?: Member_Management_Table_Recent_ActivityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_Recent_ActivityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_table_recent_activity(inputs)
	return __zh.member_management_table_recent_activity(inputs)
});
/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Member_Management_Table_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_actions = /** @type {((inputs?: Member_Management_Table_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_table_actions(inputs)
	return __zh.member_management_table_actions(inputs)
});
/**
* | output |
* | --- |
* | "The current signed-in account cannot be removed" |
*
* @param {Member_Management_Remove_Current_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_current_user = /** @type {((inputs?: Member_Management_Remove_Current_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_Current_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_remove_current_user(inputs)
	return __zh.member_management_remove_current_user(inputs)
});
/**
* | output |
* | --- |
* | "Owner cannot be removed" |
*
* @param {Member_Management_Remove_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_owner = /** @type {((inputs?: Member_Management_Remove_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_remove_owner(inputs)
	return __zh.member_management_remove_owner(inputs)
});
/**
* | output |
* | --- |
* | "Admin can only cancel Member invitations" |
*
* @param {Member_Management_Admin_Cancel_Member_Invite_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_cancel_member_invite_only = /** @type {((inputs?: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Cancel_Member_Invite_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_cancel_member_invite_only(inputs)
	return __zh.member_management_admin_cancel_member_invite_only(inputs)
});
/**
* | output |
* | --- |
* | "Admin can only remove Members" |
*
* @param {Member_Management_Admin_Remove_Member_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_remove_member_only = /** @type {((inputs?: Member_Management_Admin_Remove_Member_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Remove_Member_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_remove_member_only(inputs)
	return __zh.member_management_admin_remove_member_only(inputs)
});
/**
* | output |
* | --- |
* | "Only Owner/Admin can operate" |
*
* @param {Member_Management_Owner_Only_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_owner_only_action = /** @type {((inputs?: Member_Management_Owner_Only_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Owner_Only_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_owner_only_action(inputs)
	return __zh.member_management_owner_only_action(inputs)
});
/**
* | output |
* | --- |
* | "Current account" |
*
* @param {Member_Management_Menu_Hint_Current_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_current_account = /** @type {((inputs?: Member_Management_Menu_Hint_Current_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_Current_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_menu_hint_current_account(inputs)
	return __zh.member_management_menu_hint_current_account(inputs)
});
/**
* | output |
* | --- |
* | "Owner" |
*
* @param {Member_Management_Menu_Hint_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_owner = /** @type {((inputs?: Member_Management_Menu_Hint_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_menu_hint_owner(inputs)
	return __zh.member_management_menu_hint_owner(inputs)
});
/**
* | output |
* | --- |
* | "No permission" |
*
* @param {Member_Management_Menu_Hint_No_PermissionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_no_permission = /** @type {((inputs?: Member_Management_Menu_Hint_No_PermissionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_No_PermissionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_menu_hint_no_permission(inputs)
	return __zh.member_management_menu_hint_no_permission(inputs)
});
/**
* | output |
* | --- |
* | "The current signed-in account role cannot be changed" |
*
* @param {Member_Management_Update_Current_User_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_update_current_user_role = /** @type {((inputs?: Member_Management_Update_Current_User_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Update_Current_User_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_update_current_user_role(inputs)
	return __zh.member_management_update_current_user_role(inputs)
});
/**
* | output |
* | --- |
* | "Owner role cannot be changed" |
*
* @param {Member_Management_Update_Owner_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_update_owner_role = /** @type {((inputs?: Member_Management_Update_Owner_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Update_Owner_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_update_owner_role(inputs)
	return __zh.member_management_update_owner_role(inputs)
});
/**
* | output |
* | --- |
* | "Admin can only adjust Member invitations" |
*
* @param {Member_Management_Admin_Update_Member_Invite_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_update_member_invite_only = /** @type {((inputs?: Member_Management_Admin_Update_Member_Invite_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Update_Member_Invite_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_update_member_invite_only(inputs)
	return __zh.member_management_admin_update_member_invite_only(inputs)
});
/**
* | output |
* | --- |
* | "Admin can only adjust Members" |
*
* @param {Member_Management_Admin_Update_Member_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_update_member_only = /** @type {((inputs?: Member_Management_Admin_Update_Member_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Update_Member_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_update_member_only(inputs)
	return __zh.member_management_admin_update_member_only(inputs)
});
/**
* | output |
* | --- |
* | "Invited" |
*
* @param {Member_Management_Status_InvitedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_status_invited = /** @type {((inputs?: Member_Management_Status_InvitedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Status_InvitedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_status_invited(inputs)
	return __zh.member_management_status_invited(inputs)
});
/**
* | output |
* | --- |
* | "Joined" |
*
* @param {Member_Management_Status_JoinedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_status_joined = /** @type {((inputs?: Member_Management_Status_JoinedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Status_JoinedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_status_joined(inputs)
	return __zh.member_management_status_joined(inputs)
});
/**
* | output |
* | --- |
* | "Pending join" |
*
* @param {Member_Management_Recent_Pending_JoinInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_recent_pending_join = /** @type {((inputs?: Member_Management_Recent_Pending_JoinInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Recent_Pending_JoinInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_recent_pending_join(inputs)
	return __zh.member_management_recent_pending_join(inputs)
});
/**
* | output |
* | --- |
* | "No record" |
*
* @param {Member_Management_Recent_UnrecordedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_recent_unrecorded = /** @type {((inputs?: Member_Management_Recent_UnrecordedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Recent_UnrecordedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_recent_unrecorded(inputs)
	return __zh.member_management_recent_unrecorded(inputs)
});
/**
* | output |
* | --- |
* | "Member" |
*
* @param {Member_Management_Fallback_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_fallback_name = /** @type {((inputs?: Member_Management_Fallback_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Fallback_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_fallback_name(inputs)
	return __zh.member_management_fallback_name(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a valid email address." |
*
* @param {Member_Management_Invalid_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invalid_email = /** @type {((inputs?: Member_Management_Invalid_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invalid_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invalid_email(inputs)
	return __zh.member_management_invalid_email(inputs)
});
/**
* | output |
* | --- |
* | "Failed to send invite. Please try again later." |
*
* @param {Member_Management_Invite_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_error = /** @type {((inputs?: Member_Management_Invite_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_error(inputs)
	return __zh.member_management_invite_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update role. Please try again later." |
*
* @param {Member_Management_Role_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_update_error = /** @type {((inputs?: Member_Management_Role_Update_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Update_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_role_update_error(inputs)
	return __zh.member_management_role_update_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to resend invite. Please try again later." |
*
* @param {Member_Management_Resend_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_resend_error = /** @type {((inputs?: Member_Management_Resend_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Resend_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_resend_error(inputs)
	return __zh.member_management_resend_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to link Telegram account." |
*
* @param {Member_Management_Link_Telegram_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_link_telegram_error = /** @type {((inputs?: Member_Management_Link_Telegram_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Link_Telegram_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_link_telegram_error(inputs)
	return __zh.member_management_link_telegram_error(inputs)
});
/**
* | output |
* | --- |
* | "Current member identity could not be resolved. Account linking is unavailable for now." |
*
* @param {Member_Management_Missing_Current_Member_BindInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_missing_current_member_bind = /** @type {((inputs?: Member_Management_Missing_Current_Member_BindInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Missing_Current_Member_BindInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_missing_current_member_bind(inputs)
	return __zh.member_management_missing_current_member_bind(inputs)
});
/**
* | output |
* | --- |
* | "Failed to link platform account." |
*
* @param {Member_Management_Link_Platform_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_link_platform_error = /** @type {((inputs?: Member_Management_Link_Platform_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Link_Platform_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_link_platform_error(inputs)
	return __zh.member_management_link_platform_error(inputs)
});
/**
* | output |
* | --- |
* | "{platform} account linked." |
*
* @param {Member_Management_Platform_BoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_bound = /** @type {((inputs: Member_Management_Platform_BoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_BoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_platform_bound(inputs)
	return __zh.member_management_platform_bound(inputs)
});
/**
* | output |
* | --- |
* | "{platform} account linking failed. Please try again later." |
*
* @param {Member_Management_Platform_Bind_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_bind_failed = /** @type {((inputs: Member_Management_Platform_Bind_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_Bind_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_platform_bind_failed(inputs)
	return __zh.member_management_platform_bind_failed(inputs)
});
/**
* | output |
* | --- |
* | "{platform} account not linked." |
*
* @param {Member_Management_Platform_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_unlinked = /** @type {((inputs: Member_Management_Platform_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_platform_unlinked(inputs)
	return __zh.member_management_platform_unlinked(inputs)
});
/**
* | output |
* | --- |
* | "Click to go to the {platform} authorization page. The account link will complete automatically after authorization succeeds." |
*
* @param {Member_Management_Oauth_Link_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_oauth_link_hint = /** @type {((inputs: Member_Management_Oauth_Link_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Oauth_Link_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_oauth_link_hint(inputs)
	return __zh.member_management_oauth_link_hint(inputs)
});
/**
* | output |
* | --- |
* | "Current member identity could not be resolved. Account unlinking is unavailable for now." |
*
* @param {Member_Management_Missing_Current_Member_UnbindInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_missing_current_member_unbind = /** @type {((inputs?: Member_Management_Missing_Current_Member_UnbindInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Missing_Current_Member_UnbindInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_missing_current_member_unbind(inputs)
	return __zh.member_management_missing_current_member_unbind(inputs)
});
/**
* | output |
* | --- |
* | "Failed to unlink {platform} account." |
*
* @param {Member_Management_Unlink_Platform_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlink_platform_error = /** @type {((inputs: Member_Management_Unlink_Platform_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Unlink_Platform_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_unlink_platform_error(inputs)
	return __zh.member_management_unlink_platform_error(inputs)
});
/**
* | output |
* | --- |
* | "Cancel invite" |
*
* @param {Member_Management_Cancel_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_cancel_invite = /** @type {((inputs?: Member_Management_Cancel_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Cancel_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_cancel_invite(inputs)
	return __zh.member_management_cancel_invite(inputs)
});
/**
* | output |
* | --- |
* | "Remove member" |
*
* @param {Member_Management_Remove_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_member = /** @type {((inputs?: Member_Management_Remove_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_remove_member(inputs)
	return __zh.member_management_remove_member(inputs)
});
/**
* | output |
* | --- |
* | "Member actions" |
*
* @param {Member_Management_Actions_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_actions_title = /** @type {((inputs?: Member_Management_Actions_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Actions_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_actions_title(inputs)
	return __zh.member_management_actions_title(inputs)
});
/**
* | output |
* | --- |
* | "Action menu for {email}" |
*
* @param {Member_Management_Actions_Menu_AriaInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_actions_menu_aria = /** @type {((inputs: Member_Management_Actions_Menu_AriaInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Actions_Menu_AriaInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_actions_menu_aria(inputs)
	return __zh.member_management_actions_menu_aria(inputs)
});
/**
* | output |
* | --- |
* | "Accounts: {accounts}" |
*
* @param {Member_Management_Accounts_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_accounts_label = /** @type {((inputs: Member_Management_Accounts_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Accounts_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_accounts_label(inputs)
	return __zh.member_management_accounts_label(inputs)
});
/**
* | output |
* | --- |
* | "Not linked" |
*
* @param {Member_Management_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlinked = /** @type {((inputs?: Member_Management_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_unlinked(inputs)
	return __zh.member_management_unlinked(inputs)
});
/**
* | output |
* | --- |
* | "Adjust invite role" |
*
* @param {Member_Management_Adjust_Invite_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_adjust_invite_role = /** @type {((inputs?: Member_Management_Adjust_Invite_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Adjust_Invite_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_adjust_invite_role(inputs)
	return __zh.member_management_adjust_invite_role(inputs)
});
/**
* | output |
* | --- |
* | "Change role" |
*
* @param {Member_Management_Change_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_change_role = /** @type {((inputs?: Member_Management_Change_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Change_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_change_role(inputs)
	return __zh.member_management_change_role(inputs)
});
/**
* | output |
* | --- |
* | "Resending..." |
*
* @param {Member_Management_Resending_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_resending_invite = /** @type {((inputs?: Member_Management_Resending_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Resending_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_resending_invite(inputs)
	return __zh.member_management_resending_invite(inputs)
});
/**
* | output |
* | --- |
* | "Resend invite" |
*
* @param {Member_Management_Resend_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_resend_invite = /** @type {((inputs?: Member_Management_Resend_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Resend_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_resend_invite(inputs)
	return __zh.member_management_resend_invite(inputs)
});
/**
* | output |
* | --- |
* | "My linked platform accounts" |
*
* @param {Member_Management_My_BindingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_my_bindings = /** @type {((inputs?: Member_Management_My_BindingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_My_BindingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_my_bindings(inputs)
	return __zh.member_management_my_bindings(inputs)
});
/**
* | output |
* | --- |
* | "Your current account has not been mapped to a company member yet, so account linking is unavailable." |
*
* @param {Member_Management_No_Current_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_no_current_member = /** @type {((inputs?: Member_Management_No_Current_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_No_Current_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_no_current_member(inputs)
	return __zh.member_management_no_current_member(inputs)
});
/**
* | output |
* | --- |
* | "Linked platforms:" |
*
* @param {Member_Management_Linked_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_linked_platforms = /** @type {((inputs?: Member_Management_Linked_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Linked_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_linked_platforms(inputs)
	return __zh.member_management_linked_platforms(inputs)
});
/**
* | output |
* | --- |
* | "Telegram account linked." |
*
* @param {Member_Management_Telegram_LinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_linked = /** @type {((inputs?: Member_Management_Telegram_LinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_LinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_telegram_linked(inputs)
	return __zh.member_management_telegram_linked(inputs)
});
/**
* | output |
* | --- |
* | "Telegram account not linked." |
*
* @param {Member_Management_Telegram_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_unlinked = /** @type {((inputs?: Member_Management_Telegram_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_telegram_unlinked(inputs)
	return __zh.member_management_telegram_unlinked(inputs)
});
/**
* | output |
* | --- |
* | "Telegram account linking is not enabled in the current environment." |
*
* @param {Member_Management_Telegram_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_unavailable = /** @type {((inputs?: Member_Management_Telegram_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_telegram_unavailable(inputs)
	return __zh.member_management_telegram_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Unlinking..." |
*
* @param {Member_Management_UnlinkingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlinking = /** @type {((inputs?: Member_Management_UnlinkingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_UnlinkingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_unlinking(inputs)
	return __zh.member_management_unlinking(inputs)
});
/**
* | output |
* | --- |
* | "Unlink {platform}" |
*
* @param {Member_Management_Unlink_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlink_platform = /** @type {((inputs: Member_Management_Unlink_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Unlink_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_unlink_platform(inputs)
	return __zh.member_management_unlink_platform(inputs)
});
/**
* | output |
* | --- |
* | "Sign in with {platform} and link" |
*
* @param {Member_Management_Login_And_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_login_and_link = /** @type {((inputs: Member_Management_Login_And_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Login_And_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_login_and_link(inputs)
	return __zh.member_management_login_and_link(inputs)
});
/**
* | output |
* | --- |
* | "Linking..." |
*
* @param {Member_Management_LinkingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_linking = /** @type {((inputs?: Member_Management_LinkingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_LinkingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_linking(inputs)
	return __zh.member_management_linking(inputs)
});
/**
* | output |
* | --- |
* | "Verifying and linking the account. Please wait..." |
*
* @param {Member_Management_Binding_WaitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_binding_wait = /** @type {((inputs?: Member_Management_Binding_WaitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Binding_WaitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_binding_wait(inputs)
	return __zh.member_management_binding_wait(inputs)
});
/**
* | output |
* | --- |
* | "Invite member" |
*
* @param {Member_Management_Invite_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_dialog_title = /** @type {((inputs?: Member_Management_Invite_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_dialog_title(inputs)
	return __zh.member_management_invite_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "Choose an invite method and set the role." |
*
* @param {Member_Management_Invite_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_dialog_desc = /** @type {((inputs?: Member_Management_Invite_Dialog_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Dialog_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_dialog_desc(inputs)
	return __zh.member_management_invite_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Invite method" |
*
* @param {Member_Management_Invite_Mode_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_label = /** @type {((inputs?: Member_Management_Invite_Mode_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_mode_label(inputs)
	return __zh.member_management_invite_mode_label(inputs)
});
/**
* | output |
* | --- |
* | "Email invite" |
*
* @param {Member_Management_Invite_Mode_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_email = /** @type {((inputs?: Member_Management_Invite_Mode_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_mode_email(inputs)
	return __zh.member_management_invite_mode_email(inputs)
});
/**
* | output |
* | --- |
* | "Invite link" |
*
* @param {Member_Management_Invite_Mode_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_link = /** @type {((inputs?: Member_Management_Invite_Mode_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_mode_link(inputs)
	return __zh.member_management_invite_mode_link(inputs)
});
/**
* | output |
* | --- |
* | "This link stays valid for 24 hours. Anyone who signs up or signs in with it will join the current workspace." |
*
* @param {Member_Management_Invite_Mode_Link_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_link_hint = /** @type {((inputs?: Member_Management_Invite_Mode_Link_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_Link_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_mode_link_hint(inputs)
	return __zh.member_management_invite_mode_link_hint(inputs)
});
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Member_Management_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_email_label = /** @type {((inputs?: Member_Management_Email_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Email_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_email_label(inputs)
	return __zh.member_management_email_label(inputs)
});
/**
* | output |
* | --- |
* | "Role" |
*
* @param {Member_Management_Role_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_label = /** @type {((inputs?: Member_Management_Role_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_role_label(inputs)
	return __zh.member_management_role_label(inputs)
});
/**
* | output |
* | --- |
* | "Select role" |
*
* @param {Member_Management_Role_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_placeholder = /** @type {((inputs?: Member_Management_Role_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_role_placeholder(inputs)
	return __zh.member_management_role_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Generate invite link" |
*
* @param {Member_Management_Generate_Invite_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_generate_invite_link = /** @type {((inputs?: Member_Management_Generate_Invite_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Generate_Invite_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_generate_invite_link(inputs)
	return __zh.member_management_generate_invite_link(inputs)
});
/**
* | output |
* | --- |
* | "Generating..." |
*
* @param {Member_Management_Invite_Link_GeneratingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_generating = /** @type {((inputs?: Member_Management_Invite_Link_GeneratingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_GeneratingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_link_generating(inputs)
	return __zh.member_management_invite_link_generating(inputs)
});
/**
* | output |
* | --- |
* | "Copy invite link" |
*
* @param {Member_Management_Copy_Invite_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_copy_invite_link = /** @type {((inputs?: Member_Management_Copy_Invite_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Copy_Invite_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_copy_invite_link(inputs)
	return __zh.member_management_copy_invite_link(inputs)
});
/**
* | output |
* | --- |
* | "Invite link" |
*
* @param {Member_Management_Invite_Link_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_label = /** @type {((inputs?: Member_Management_Invite_Link_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_link_label(inputs)
	return __zh.member_management_invite_link_label(inputs)
});
/**
* | output |
* | --- |
* | "Invite link copied. It expires in 24 hours." |
*
* @param {Member_Management_Invite_Link_CopiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_copied = /** @type {((inputs?: Member_Management_Invite_Link_CopiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_CopiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_link_copied(inputs)
	return __zh.member_management_invite_link_copied(inputs)
});
/**
* | output |
* | --- |
* | "Failed to generate invite link. Please try again later." |
*
* @param {Member_Management_Invite_Link_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_error = /** @type {((inputs?: Member_Management_Invite_Link_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_link_error(inputs)
	return __zh.member_management_invite_link_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to copy the invite link. Please copy it manually." |
*
* @param {Member_Management_Invite_Link_Copy_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_copy_failed = /** @type {((inputs?: Member_Management_Invite_Link_Copy_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_Copy_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_invite_link_copy_failed(inputs)
	return __zh.member_management_invite_link_copy_failed(inputs)
});
/**
* | output |
* | --- |
* | "Send invite" |
*
* @param {Member_Management_Send_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_send_invite = /** @type {((inputs?: Member_Management_Send_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Send_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_send_invite(inputs)
	return __zh.member_management_send_invite(inputs)
});
/**
* | output |
* | --- |
* | "Sending..." |
*
* @param {Member_Management_Sending_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_sending_invite = /** @type {((inputs?: Member_Management_Sending_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Sending_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_sending_invite(inputs)
	return __zh.member_management_sending_invite(inputs)
});
/**
* | output |
* | --- |
* | "{email} is currently {role}." |
*
* @param {Member_Management_Role_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_dialog_desc = /** @type {((inputs: Member_Management_Role_Dialog_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Dialog_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_role_dialog_desc(inputs)
	return __zh.member_management_role_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Choose a new member role." |
*
* @param {Member_Management_Role_Dialog_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_dialog_empty_desc = /** @type {((inputs?: Member_Management_Role_Dialog_Empty_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Dialog_Empty_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_role_dialog_empty_desc(inputs)
	return __zh.member_management_role_dialog_empty_desc(inputs)
});
/**
* | output |
* | --- |
* | "Admin quota is full ({count}/{limit}). Please change the plan or switch to Member." |
*
* @param {Member_Management_Admin_Quota_Full_UpdateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_full_update = /** @type {((inputs: Member_Management_Admin_Quota_Full_UpdateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_Full_UpdateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_quota_full_update(inputs)
	return __zh.member_management_admin_quota_full_update(inputs)
});
/**
* | output |
* | --- |
* | "Admin quota is full ({count}/{limit}). Please change the plan or invite as Member instead." |
*
* @param {Member_Management_Admin_Quota_Full_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_full_invite = /** @type {((inputs: Member_Management_Admin_Quota_Full_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_Full_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_quota_full_invite(inputs)
	return __zh.member_management_admin_quota_full_invite(inputs)
});
/**
* | output |
* | --- |
* | "Admin quota is full. Free a slot first before adjusting." |
*
* @param {Member_Management_Admin_Quota_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_hint = /** @type {((inputs?: Member_Management_Admin_Quota_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_admin_quota_hint(inputs)
	return __zh.member_management_admin_quota_hint(inputs)
});
/**
* | output |
* | --- |
* | "{name} avatar" |
*
* @param {Member_Management_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_avatar_alt = /** @type {((inputs: Member_Management_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_avatar_alt(inputs)
	return __zh.member_management_avatar_alt(inputs)
});
/**
* | output |
* | --- |
* | "Save role" |
*
* @param {Member_Management_Save_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_save_role = /** @type {((inputs?: Member_Management_Save_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Save_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_save_role(inputs)
	return __zh.member_management_save_role(inputs)
});
/**
* | output |
* | --- |
* | "Invite link unavailable" |
*
* @param {Member_Invite_Invalid_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_invalid_title = /** @type {((inputs?: Member_Invite_Invalid_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Invalid_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_invalid_title(inputs)
	return __zh.member_invite_invalid_title(inputs)
});
/**
* | output |
* | --- |
* | "This invite link is invalid, expired, or the underlying invitation no longer exists." |
*
* @param {Member_Invite_Invalid_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_invalid_desc = /** @type {((inputs?: Member_Invite_Invalid_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Invalid_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_invalid_desc(inputs)
	return __zh.member_invite_invalid_desc(inputs)
});
/**
* | output |
* | --- |
* | "Failed to switch accounts. Please try again later." |
*
* @param {Member_Invite_Switch_Account_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switch_account_error = /** @type {((inputs?: Member_Invite_Switch_Account_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switch_Account_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_switch_account_error(inputs)
	return __zh.member_invite_switch_account_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to accept the invitation. Please try again later." |
*
* @param {Member_Invite_Accept_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_accept_error = /** @type {((inputs?: Member_Invite_Accept_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Accept_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_accept_error(inputs)
	return __zh.member_invite_accept_error(inputs)
});
/**
* | output |
* | --- |
* | "Workspace Invite" |
*
* @param {Member_Invite_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_badge = /** @type {((inputs?: Member_Invite_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_badge(inputs)
	return __zh.member_invite_badge(inputs)
});
/**
* | output |
* | --- |
* | "This link will add whoever signs in as {role} to the current Lucius workspace." |
*
* @param {Member_Invite_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_summary = /** @type {((inputs: Member_Invite_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_summary(inputs)
	return __zh.member_invite_summary(inputs)
});
/**
* | output |
* | --- |
* | "Invited role" |
*
* @param {Member_Invite_Role_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_role_label = /** @type {((inputs?: Member_Invite_Role_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Role_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_role_label(inputs)
	return __zh.member_invite_role_label(inputs)
});
/**
* | output |
* | --- |
* | "Expires at" |
*
* @param {Member_Invite_Expiry_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expiry_label = /** @type {((inputs?: Member_Invite_Expiry_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expiry_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_expiry_label(inputs)
	return __zh.member_invite_expiry_label(inputs)
});
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Member_Invite_Status_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_status_label = /** @type {((inputs?: Member_Invite_Status_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Status_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_status_label(inputs)
	return __zh.member_invite_status_label(inputs)
});
/**
* | output |
* | --- |
* | "Invite accepted" |
*
* @param {Member_Invite_Joined_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_title = /** @type {((inputs?: Member_Invite_Joined_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_joined_title(inputs)
	return __zh.member_invite_joined_title(inputs)
});
/**
* | output |
* | --- |
* | "The current account is already in this workspace. You can go straight to the dashboard." |
*
* @param {Member_Invite_Joined_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_desc = /** @type {((inputs?: Member_Invite_Joined_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_joined_desc(inputs)
	return __zh.member_invite_joined_desc(inputs)
});
/**
* | output |
* | --- |
* | "This account already belongs to the workspace" |
*
* @param {Member_Invite_Joined_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_badge = /** @type {((inputs?: Member_Invite_Joined_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_joined_badge(inputs)
	return __zh.member_invite_joined_badge(inputs)
});
/**
* | output |
* | --- |
* | "Invite expired" |
*
* @param {Member_Invite_Expired_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expired_title = /** @type {((inputs?: Member_Invite_Expired_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expired_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_expired_title(inputs)
	return __zh.member_invite_expired_title(inputs)
});
/**
* | output |
* | --- |
* | "This link has passed its validity window. Ask an admin to generate a new invite link." |
*
* @param {Member_Invite_Expired_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expired_desc = /** @type {((inputs?: Member_Invite_Expired_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expired_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_expired_desc(inputs)
	return __zh.member_invite_expired_desc(inputs)
});
/**
* | output |
* | --- |
* | "Invite cancelled" |
*
* @param {Member_Invite_Cancelled_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_cancelled_title = /** @type {((inputs?: Member_Invite_Cancelled_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Cancelled_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_cancelled_title(inputs)
	return __zh.member_invite_cancelled_title(inputs)
});
/**
* | output |
* | --- |
* | "An admin has cancelled this invitation. Ask them to send a new one." |
*
* @param {Member_Invite_Cancelled_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_cancelled_desc = /** @type {((inputs?: Member_Invite_Cancelled_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Cancelled_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_cancelled_desc(inputs)
	return __zh.member_invite_cancelled_desc(inputs)
});
/**
* | output |
* | --- |
* | "Invite already handled" |
*
* @param {Member_Invite_Used_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_used_title = /** @type {((inputs?: Member_Invite_Used_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Used_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_used_title(inputs)
	return __zh.member_invite_used_title(inputs)
});
/**
* | output |
* | --- |
* | "This invitation has already been accepted and cannot be reused by the current account." |
*
* @param {Member_Invite_Used_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_used_desc = /** @type {((inputs?: Member_Invite_Used_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Used_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_used_desc(inputs)
	return __zh.member_invite_used_desc(inputs)
});
/**
* | output |
* | --- |
* | "Wrong account" |
*
* @param {Member_Invite_Email_Mismatch_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_email_mismatch_title = /** @type {((inputs?: Member_Invite_Email_Mismatch_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Email_Mismatch_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_email_mismatch_title(inputs)
	return __zh.member_invite_email_mismatch_title(inputs)
});
/**
* | output |
* | --- |
* | "Please sign in with {email} before accepting this invite." |
*
* @param {Member_Invite_Email_Mismatch_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_email_mismatch_desc = /** @type {((inputs: Member_Invite_Email_Mismatch_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Email_Mismatch_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_email_mismatch_desc(inputs)
	return __zh.member_invite_email_mismatch_desc(inputs)
});
/**
* | output |
* | --- |
* | "Join this workspace" |
*
* @param {Member_Invite_Ready_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_ready_title = /** @type {((inputs?: Member_Invite_Ready_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Ready_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_ready_title(inputs)
	return __zh.member_invite_ready_title(inputs)
});
/**
* | output |
* | --- |
* | "The current account is already signed in. We will auto-join it to the workspace, and you can retry manually if needed." |
*
* @param {Member_Invite_Ready_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_ready_desc = /** @type {((inputs?: Member_Invite_Ready_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Ready_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_ready_desc(inputs)
	return __zh.member_invite_ready_desc(inputs)
});
/**
* | output |
* | --- |
* | "Sign in to continue" |
*
* @param {Member_Invite_Login_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_title = /** @type {((inputs?: Member_Invite_Login_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_login_title(inputs)
	return __zh.member_invite_login_title(inputs)
});
/**
* | output |
* | --- |
* | "Sign up or sign in first. After authentication, the workspace join will continue automatically." |
*
* @param {Member_Invite_Login_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_desc = /** @type {((inputs?: Member_Invite_Login_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_login_desc(inputs)
	return __zh.member_invite_login_desc(inputs)
});
/**
* | output |
* | --- |
* | "Open workspace" |
*
* @param {Member_Invite_Open_WorkspaceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_open_workspace = /** @type {((inputs?: Member_Invite_Open_WorkspaceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Open_WorkspaceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_open_workspace(inputs)
	return __zh.member_invite_open_workspace(inputs)
});
/**
* | output |
* | --- |
* | "Switching..." |
*
* @param {Member_Invite_Switching_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switching_account = /** @type {((inputs?: Member_Invite_Switching_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switching_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_switching_account(inputs)
	return __zh.member_invite_switching_account(inputs)
});
/**
* | output |
* | --- |
* | "Sign out and switch account" |
*
* @param {Member_Invite_Switch_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switch_account = /** @type {((inputs?: Member_Invite_Switch_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switch_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_switch_account(inputs)
	return __zh.member_invite_switch_account(inputs)
});
/**
* | output |
* | --- |
* | "Joining..." |
*
* @param {Member_Invite_AcceptingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_accepting = /** @type {((inputs?: Member_Invite_AcceptingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_AcceptingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_accepting(inputs)
	return __zh.member_invite_accepting(inputs)
});
/**
* | output |
* | --- |
* | "Retry joining" |
*
* @param {Member_Invite_Accept_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_accept_action = /** @type {((inputs?: Member_Invite_Accept_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Accept_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_accept_action(inputs)
	return __zh.member_invite_accept_action(inputs)
});
/**
* | output |
* | --- |
* | "Sign in and continue" |
*
* @param {Member_Invite_Login_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_action = /** @type {((inputs?: Member_Invite_Login_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_login_action(inputs)
	return __zh.member_invite_login_action(inputs)
});
/**
* | output |
* | --- |
* | "Back to dashboard" |
*
* @param {Member_Invite_Back_DashboardInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_back_dashboard = /** @type {((inputs?: Member_Invite_Back_DashboardInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Back_DashboardInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_invite_back_dashboard(inputs)
	return __zh.member_invite_back_dashboard(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Telegram sign-in widget. Please check your network and try again." |
*
* @param {Telegram_Widget_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_widget_load_error = /** @type {((inputs?: Telegram_Widget_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Widget_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_widget_load_error(inputs)
	return __zh.telegram_widget_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Group" |
*
* @param {Telegram_Settings_GroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_group = /** @type {((inputs?: Telegram_Settings_GroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_GroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_group(inputs)
	return __zh.telegram_settings_group(inputs)
});
/**
* | output |
* | --- |
* | "Supergroup" |
*
* @param {Telegram_Settings_SupergroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_supergroup = /** @type {((inputs?: Telegram_Settings_SupergroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_SupergroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_supergroup(inputs)
	return __zh.telegram_settings_supergroup(inputs)
});
/**
* | output |
* | --- |
* | "Channel" |
*
* @param {Telegram_Settings_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_channel = /** @type {((inputs?: Telegram_Settings_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_channel(inputs)
	return __zh.telegram_settings_channel(inputs)
});
/**
* | output |
* | --- |
* | "Private" |
*
* @param {Telegram_Settings_PrivateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_private = /** @type {((inputs?: Telegram_Settings_PrivateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_PrivateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_private(inputs)
	return __zh.telegram_settings_private(inputs)
});
/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Telegram_Settings_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_unknown = /** @type {((inputs?: Telegram_Settings_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_unknown(inputs)
	return __zh.telegram_settings_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Waiting for bot to join" |
*
* @param {Telegram_Settings_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_pending = /** @type {((inputs?: Telegram_Settings_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_status_pending(inputs)
	return __zh.telegram_settings_status_pending(inputs)
});
/**
* | output |
* | --- |
* | "Bound" |
*
* @param {Telegram_Settings_Status_FulfilledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_fulfilled = /** @type {((inputs?: Telegram_Settings_Status_FulfilledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_FulfilledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_status_fulfilled(inputs)
	return __zh.telegram_settings_status_fulfilled(inputs)
});
/**
* | output |
* | --- |
* | "Expired" |
*
* @param {Telegram_Settings_Status_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_expired = /** @type {((inputs?: Telegram_Settings_Status_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_status_expired(inputs)
	return __zh.telegram_settings_status_expired(inputs)
});
/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Telegram_Settings_Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_cancelled = /** @type {((inputs?: Telegram_Settings_Status_CancelledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_CancelledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_status_cancelled(inputs)
	return __zh.telegram_settings_status_cancelled(inputs)
});
/**
* | output |
* | --- |
* | "Binding failed" |
*
* @param {Telegram_Settings_Status_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_failed = /** @type {((inputs?: Telegram_Settings_Status_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_status_failed(inputs)
	return __zh.telegram_settings_status_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Telegram integration config." |
*
* @param {Telegram_Settings_Load_Config_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_load_config_error = /** @type {((inputs?: Telegram_Settings_Load_Config_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Load_Config_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_load_config_error(inputs)
	return __zh.telegram_settings_load_config_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load bound Telegram communities." |
*
* @param {Telegram_Settings_Load_Bound_Channels_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_load_bound_channels_error = /** @type {((inputs?: Telegram_Settings_Load_Bound_Channels_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Load_Bound_Channels_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_load_bound_channels_error(inputs)
	return __zh.telegram_settings_load_bound_channels_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Telegram community list." |
*
* @param {Telegram_Settings_Load_Candidates_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_load_candidates_error = /** @type {((inputs?: Telegram_Settings_Load_Candidates_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Load_Candidates_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_load_candidates_error(inputs)
	return __zh.telegram_settings_load_candidates_error(inputs)
});
/**
* | output |
* | --- |
* | "Telegram session has expired. Please sign in again." |
*
* @param {Telegram_Settings_Session_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_session_expired = /** @type {((inputs?: Telegram_Settings_Session_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Session_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_session_expired(inputs)
	return __zh.telegram_settings_session_expired(inputs)
});
/**
* | output |
* | --- |
* | "Please choose the company to bind at the top first." |
*
* @param {Telegram_Settings_Select_Company_TopInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_select_company_top = /** @type {((inputs?: Telegram_Settings_Select_Company_TopInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Select_Company_TopInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_select_company_top(inputs)
	return __zh.telegram_settings_select_company_top(inputs)
});
/**
* | output |
* | --- |
* | "Signed in successfully. Continue by adding the bot to the target community." |
*
* @param {Telegram_Settings_Login_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login_success = /** @type {((inputs?: Telegram_Settings_Login_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Login_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_login_success(inputs)
	return __zh.telegram_settings_login_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create Telegram integration session." |
*
* @param {Telegram_Settings_Create_Session_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_create_session_error = /** @type {((inputs?: Telegram_Settings_Create_Session_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Create_Session_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_create_session_error(inputs)
	return __zh.telegram_settings_create_session_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create Telegram binding intent." |
*
* @param {Telegram_Settings_Create_Binding_Intent_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_create_binding_intent_error = /** @type {((inputs?: Telegram_Settings_Create_Binding_Intent_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Create_Binding_Intent_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_create_binding_intent_error(inputs)
	return __zh.telegram_settings_create_binding_intent_error(inputs)
});
/**
* | output |
* | --- |
* | "The Telegram community has been automatically linked: {name}" |
*
* @param {Telegram_Settings_Auto_Bind_Success_NamedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_success_named = /** @type {((inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_Success_NamedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_auto_bind_success_named(inputs)
	return __zh.telegram_settings_auto_bind_success_named(inputs)
});
/**
* | output |
* | --- |
* | "The Telegram community was automatically linked to the current company." |
*
* @param {Telegram_Settings_Auto_Bind_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_success = /** @type {((inputs?: Telegram_Settings_Auto_Bind_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_auto_bind_success(inputs)
	return __zh.telegram_settings_auto_bind_success(inputs)
});
/**
* | output |
* | --- |
* | "The automatic binding intent has expired. Please sign in again and retry." |
*
* @param {Telegram_Settings_Auto_Bind_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_expired = /** @type {((inputs?: Telegram_Settings_Auto_Bind_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_auto_bind_expired(inputs)
	return __zh.telegram_settings_auto_bind_expired(inputs)
});
/**
* | output |
* | --- |
* | "Automatic binding is not complete yet. Check whether the bot has joined the target community, then try again." |
*
* @param {Telegram_Settings_Auto_Bind_IncompleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_incomplete = /** @type {((inputs?: Telegram_Settings_Auto_Bind_IncompleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_IncompleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_auto_bind_incomplete(inputs)
	return __zh.telegram_settings_auto_bind_incomplete(inputs)
});
/**
* | output |
* | --- |
* | "Failed to query automatic binding status." |
*
* @param {Telegram_Settings_Poll_Status_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_poll_status_error = /** @type {((inputs?: Telegram_Settings_Poll_Status_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Poll_Status_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_poll_status_error(inputs)
	return __zh.telegram_settings_poll_status_error(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first." |
*
* @param {Telegram_Settings_Select_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_select_company_first = /** @type {((inputs?: Telegram_Settings_Select_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Select_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_select_company_first(inputs)
	return __zh.telegram_settings_select_company_first(inputs)
});
/**
* | output |
* | --- |
* | "Telegram has been opened. Please confirm adding the bot in the target community." |
*
* @param {Telegram_Settings_Open_Telegram_ConfirmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_open_telegram_confirm = /** @type {((inputs?: Telegram_Settings_Open_Telegram_ConfirmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Open_Telegram_ConfirmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_open_telegram_confirm(inputs)
	return __zh.telegram_settings_open_telegram_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Please complete Telegram sign-in first." |
*
* @param {Telegram_Settings_Login_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login_first = /** @type {((inputs?: Telegram_Settings_Login_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Login_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_login_first(inputs)
	return __zh.telegram_settings_login_first(inputs)
});
/**
* | output |
* | --- |
* | "Telegram has been opened. Please add the bot to the target community." |
*
* @param {Telegram_Settings_Open_Telegram_Add_BotInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_open_telegram_add_bot = /** @type {((inputs?: Telegram_Settings_Open_Telegram_Add_BotInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Open_Telegram_Add_BotInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_open_telegram_add_bot(inputs)
	return __zh.telegram_settings_open_telegram_add_bot(inputs)
});
/**
* | output |
* | --- |
* | "Add Community" |
*
* @param {Telegram_Settings_Add_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_add_community = /** @type {((inputs?: Telegram_Settings_Add_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Add_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_add_community(inputs)
	return __zh.telegram_settings_add_community(inputs)
});
/**
* | output |
* | --- |
* | "No communities yet. Click Add Community in the top-right." |
*
* @param {Telegram_Settings_Empty_With_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_empty_with_company = /** @type {((inputs?: Telegram_Settings_Empty_With_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Empty_With_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_empty_with_company(inputs)
	return __zh.telegram_settings_empty_with_company(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first, then add a community." |
*
* @param {Telegram_Settings_Empty_Without_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_empty_without_company = /** @type {((inputs?: Telegram_Settings_Empty_Without_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Empty_Without_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_empty_without_company(inputs)
	return __zh.telegram_settings_empty_without_company(inputs)
});
/**
* | output |
* | --- |
* | "Add Telegram Community" |
*
* @param {Telegram_Settings_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_dialog_title = /** @type {((inputs?: Telegram_Settings_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_dialog_title(inputs)
	return __zh.telegram_settings_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "1. Sign in to Telegram" |
*
* @param {Telegram_Settings_Step_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_login = /** @type {((inputs?: Telegram_Settings_Step_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_step_login(inputs)
	return __zh.telegram_settings_step_login(inputs)
});
/**
* | output |
* | --- |
* | "Sign in with Telegram" |
*
* @param {Telegram_Settings_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login = /** @type {((inputs?: Telegram_Settings_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_login(inputs)
	return __zh.telegram_settings_login(inputs)
});
/**
* | output |
* | --- |
* | "Signing in..." |
*
* @param {Telegram_Settings_Logging_InInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logging_in = /** @type {((inputs?: Telegram_Settings_Logging_InInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logging_InInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_logging_in(inputs)
	return __zh.telegram_settings_logging_in(inputs)
});
/**
* | output |
* | --- |
* | "Telegram integration is not enabled in the current environment." |
*
* @param {Telegram_Settings_Integration_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_integration_disabled = /** @type {((inputs?: Telegram_Settings_Integration_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Integration_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_integration_disabled(inputs)
	return __zh.telegram_settings_integration_disabled(inputs)
});
/**
* | output |
* | --- |
* | "Verifying sign-in..." |
*
* @param {Telegram_Settings_Verifying_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_verifying_login = /** @type {((inputs?: Telegram_Settings_Verifying_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Verifying_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_verifying_login(inputs)
	return __zh.telegram_settings_verifying_login(inputs)
});
/**
* | output |
* | --- |
* | "Signed in as: {name}" |
*
* @param {Telegram_Settings_Logged_In_As_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logged_in_as_name = /** @type {((inputs: Telegram_Settings_Logged_In_As_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logged_In_As_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_logged_in_as_name(inputs)
	return __zh.telegram_settings_logged_in_as_name(inputs)
});
/**
* | output |
* | --- |
* | "Signed in as: {name} (@{username})" |
*
* @param {Telegram_Settings_Logged_In_As_UsernameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logged_in_as_username = /** @type {((inputs: Telegram_Settings_Logged_In_As_UsernameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logged_In_As_UsernameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_logged_in_as_username(inputs)
	return __zh.telegram_settings_logged_in_as_username(inputs)
});
/**
* | output |
* | --- |
* | "2. Add the bot to a community" |
*
* @param {Telegram_Settings_Step_Add_BotInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_add_bot = /** @type {((inputs?: Telegram_Settings_Step_Add_BotInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_Add_BotInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_step_add_bot(inputs)
	return __zh.telegram_settings_step_add_bot(inputs)
});
/**
* | output |
* | --- |
* | "Add @{username}" |
*
* @param {Telegram_Settings_Add_Bot_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_add_bot_button = /** @type {((inputs: Telegram_Settings_Add_Bot_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Add_Bot_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_add_bot_button(inputs)
	return __zh.telegram_settings_add_bot_button(inputs)
});
/**
* | output |
* | --- |
* | "3. Sync community list" |
*
* @param {Telegram_Settings_Step_Sync_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_sync_communities = /** @type {((inputs?: Telegram_Settings_Step_Sync_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_Sync_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_step_sync_communities(inputs)
	return __zh.telegram_settings_step_sync_communities(inputs)
});
/**
* | output |
* | --- |
* | "Refresh community list" |
*
* @param {Telegram_Settings_Refresh_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_refresh_communities = /** @type {((inputs?: Telegram_Settings_Refresh_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Refresh_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.telegram_settings_refresh_communities(inputs)
	return __zh.telegram_settings_refresh_communities(inputs)
});
/**
* | output |
* | --- |
* | "Event Settings" |
*
* @param {Event_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_title = /** @type {((inputs?: Event_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_title(inputs)
	return __zh.event_settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first." |
*
* @param {Event_Settings_Select_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_select_company_first = /** @type {((inputs?: Event_Settings_Select_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Select_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_select_company_first(inputs)
	return __zh.event_settings_select_company_first(inputs)
});
/**
* | output |
* | --- |
* | "Add type" |
*
* @param {Event_Settings_Add_TypeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_add_type = /** @type {((inputs?: Event_Settings_Add_TypeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Add_TypeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_add_type(inputs)
	return __zh.event_settings_add_type(inputs)
});
/**
* | output |
* | --- |
* | "Select responsible member(s) first" |
*
* @param {Event_Settings_Trigger_Select_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_select_owner = /** @type {((inputs?: Event_Settings_Trigger_Select_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_Select_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_trigger_select_owner(inputs)
	return __zh.event_settings_trigger_select_owner(inputs)
});
/**
* | output |
* | --- |
* | "Responsible members have no linked accounts" |
*
* @param {Event_Settings_Trigger_Owner_UnboundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_owner_unbound = /** @type {((inputs?: Event_Settings_Trigger_Owner_UnboundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_Owner_UnboundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_trigger_owner_unbound(inputs)
	return __zh.event_settings_trigger_owner_unbound(inputs)
});
/**
* | output |
* | --- |
* | "No available channels" |
*
* @param {Event_Settings_Trigger_No_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_no_channels = /** @type {((inputs?: Event_Settings_Trigger_No_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_No_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_trigger_no_channels(inputs)
	return __zh.event_settings_trigger_no_channels(inputs)
});
/**
* | output |
* | --- |
* | "Select platform channels" |
*
* @param {Event_Settings_Trigger_Select_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_select_channel = /** @type {((inputs?: Event_Settings_Trigger_Select_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_Select_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_trigger_select_channel(inputs)
	return __zh.event_settings_trigger_select_channel(inputs)
});
/**
* | output |
* | --- |
* | "Back to type list" |
*
* @param {Event_Settings_Back_To_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_back_to_list = /** @type {((inputs?: Event_Settings_Back_To_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Back_To_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_back_to_list(inputs)
	return __zh.event_settings_back_to_list(inputs)
});
/**
* | output |
* | --- |
* | "New type rule details" |
*
* @param {Event_Settings_Detail_Title_NewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_new = /** @type {((inputs?: Event_Settings_Detail_Title_NewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_NewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_detail_title_new(inputs)
	return __zh.event_settings_detail_title_new(inputs)
});
/**
* | output |
* | --- |
* | "{name} rule details" |
*
* @param {Event_Settings_Detail_Title_ExistingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_existing = /** @type {((inputs: Event_Settings_Detail_Title_ExistingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_ExistingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_detail_title_existing(inputs)
	return __zh.event_settings_detail_title_existing(inputs)
});
/**
* | output |
* | --- |
* | "Rule details" |
*
* @param {Event_Settings_Detail_Title_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_default = /** @type {((inputs?: Event_Settings_Detail_Title_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_detail_title_default(inputs)
	return __zh.event_settings_detail_title_default(inputs)
});
/**
* | output |
* | --- |
* | "This event type was not found." |
*
* @param {Event_Settings_Type_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_type_not_found = /** @type {((inputs?: Event_Settings_Type_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Type_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_type_not_found(inputs)
	return __zh.event_settings_type_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Type key" |
*
* @param {Event_Settings_Label_Type_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_type_key = /** @type {((inputs?: Event_Settings_Label_Type_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Type_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_type_key(inputs)
	return __zh.event_settings_label_type_key(inputs)
});
/**
* | output |
* | --- |
* | "Type name" |
*
* @param {Event_Settings_Label_Type_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_type_name = /** @type {((inputs?: Event_Settings_Label_Type_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Type_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_type_name(inputs)
	return __zh.event_settings_label_type_name(inputs)
});
/**
* | output |
* | --- |
* | "Type description" |
*
* @param {Event_Settings_Label_Type_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_type_description = /** @type {((inputs?: Event_Settings_Label_Type_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Type_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_type_description(inputs)
	return __zh.event_settings_label_type_description(inputs)
});
/**
* | output |
* | --- |
* | "Responsible members (multi-select)" |
*
* @param {Event_Settings_Label_ResponsibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_responsible = /** @type {((inputs?: Event_Settings_Label_ResponsibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_ResponsibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_responsible(inputs)
	return __zh.event_settings_label_responsible(inputs)
});
/**
* | output |
* | --- |
* | "Select responsible members" |
*
* @param {Event_Settings_Select_ResponsibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_select_responsible = /** @type {((inputs?: Event_Settings_Select_ResponsibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Select_ResponsibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_select_responsible(inputs)
	return __zh.event_settings_select_responsible(inputs)
});
/**
* | output |
* | --- |
* | "Organization members (by email)" |
*
* @param {Event_Settings_Member_List_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_member_list_label = /** @type {((inputs?: Event_Settings_Member_List_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Member_List_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_member_list_label(inputs)
	return __zh.event_settings_member_list_label(inputs)
});
/**
* | output |
* | --- |
* | "No available members." |
*
* @param {Event_Settings_No_MembersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_no_members = /** @type {((inputs?: Event_Settings_No_MembersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_No_MembersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_no_members(inputs)
	return __zh.event_settings_no_members(inputs)
});
/**
* | output |
* | --- |
* | "Linked: {accounts}" |
*
* @param {Event_Settings_Bound_AccountsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_bound_accounts = /** @type {((inputs: Event_Settings_Bound_AccountsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Bound_AccountsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_bound_accounts(inputs)
	return __zh.event_settings_bound_accounts(inputs)
});
/**
* | output |
* | --- |
* | "No linked accounts" |
*
* @param {Event_Settings_Unbound_AccountsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_unbound_accounts = /** @type {((inputs?: Event_Settings_Unbound_AccountsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Unbound_AccountsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_unbound_accounts(inputs)
	return __zh.event_settings_unbound_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Platform notification channels (multi-select)" |
*
* @param {Event_Settings_Label_Platform_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_platform_channels = /** @type {((inputs?: Event_Settings_Label_Platform_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Platform_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_platform_channels(inputs)
	return __zh.event_settings_label_platform_channels(inputs)
});
/**
* | output |
* | --- |
* | "Platform channel list" |
*
* @param {Event_Settings_Platform_Channel_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_platform_channel_list = /** @type {((inputs?: Event_Settings_Platform_Channel_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Platform_Channel_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_platform_channel_list(inputs)
	return __zh.event_settings_platform_channel_list(inputs)
});
/**
* | output |
* | --- |
* | "No available channels." |
*
* @param {Event_Settings_No_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_no_channels = /** @type {((inputs?: Event_Settings_No_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_No_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_no_channels(inputs)
	return __zh.event_settings_no_channels(inputs)
});
/**
* | output |
* | --- |
* | "Send notifications" |
*
* @param {Event_Settings_Label_Send_NotificationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_send_notification = /** @type {((inputs?: Event_Settings_Label_Send_NotificationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Send_NotificationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_label_send_notification(inputs)
	return __zh.event_settings_label_send_notification(inputs)
});
/**
* | output |
* | --- |
* | "When turned off, this event type will not notify responsible members." |
*
* @param {Event_Settings_Notify_Disabled_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_disabled_hint = /** @type {((inputs?: Event_Settings_Notify_Disabled_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_Disabled_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_notify_disabled_hint(inputs)
	return __zh.event_settings_notify_disabled_hint(inputs)
});
/**
* | output |
* | --- |
* | "Notification targets" |
*
* @param {Event_Settings_Notification_TargetsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notification_targets = /** @type {((inputs?: Event_Settings_Notification_TargetsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notification_TargetsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_notification_targets(inputs)
	return __zh.event_settings_notification_targets(inputs)
});
/**
* | output |
* | --- |
* | "No notification targets." |
*
* @param {Event_Settings_Notification_Targets_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notification_targets_empty = /** @type {((inputs?: Event_Settings_Notification_Targets_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notification_Targets_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_notification_targets_empty(inputs)
	return __zh.event_settings_notification_targets_empty(inputs)
});
/**
* | output |
* | --- |
* | "Event types" |
*
* @param {Event_Settings_List_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_list_title = /** @type {((inputs?: Event_Settings_List_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_List_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_list_title(inputs)
	return __zh.event_settings_list_title(inputs)
});
/**
* | output |
* | --- |
* | "This company does not have any event types yet." |
*
* @param {Event_Settings_List_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_list_empty = /** @type {((inputs?: Event_Settings_List_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_List_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_list_empty(inputs)
	return __zh.event_settings_list_empty(inputs)
});
/**
* | output |
* | --- |
* | "System" |
*
* @param {Event_Settings_System_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_system_badge = /** @type {((inputs?: Event_Settings_System_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_System_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_system_badge(inputs)
	return __zh.event_settings_system_badge(inputs)
});
/**
* | output |
* | --- |
* | "Unnamed type" |
*
* @param {Event_Settings_Unnamed_TypeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_unnamed_type = /** @type {((inputs?: Event_Settings_Unnamed_TypeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Unnamed_TypeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_unnamed_type(inputs)
	return __zh.event_settings_unnamed_type(inputs)
});
/**
* | output |
* | --- |
* | "Exception Issue" |
*
* @param {Event_Type_Label_Exception_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_exception_issue = /** @type {((inputs?: Event_Type_Label_Exception_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Exception_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_exception_issue(inputs)
	return __zh.event_type_label_exception_issue(inputs)
});
/**
* | output |
* | --- |
* | "Usage Issue" |
*
* @param {Event_Type_Label_Usage_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_usage_issue = /** @type {((inputs?: Event_Type_Label_Usage_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Usage_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_usage_issue(inputs)
	return __zh.event_type_label_usage_issue(inputs)
});
/**
* | output |
* | --- |
* | "Order Issue" |
*
* @param {Event_Type_Label_Order_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_order_issue = /** @type {((inputs?: Event_Type_Label_Order_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Order_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_order_issue(inputs)
	return __zh.event_type_label_order_issue(inputs)
});
/**
* | output |
* | --- |
* | "Business Cooperation" |
*
* @param {Event_Type_Label_Business_CooperationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_business_cooperation = /** @type {((inputs?: Event_Type_Label_Business_CooperationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Business_CooperationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_business_cooperation(inputs)
	return __zh.event_type_label_business_cooperation(inputs)
});
/**
* | output |
* | --- |
* | "Product Feedback" |
*
* @param {Event_Type_Label_Product_FeedbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_product_feedback = /** @type {((inputs?: Event_Type_Label_Product_FeedbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Product_FeedbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_product_feedback(inputs)
	return __zh.event_type_label_product_feedback(inputs)
});
/**
* | output |
* | --- |
* | "Unrecognized Information" |
*
* @param {Event_Type_Label_Unrecognized_InformationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_unrecognized_information = /** @type {((inputs?: Event_Type_Label_Unrecognized_InformationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Unrecognized_InformationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_unrecognized_information(inputs)
	return __zh.event_type_label_unrecognized_information(inputs)
});
/**
* | output |
* | --- |
* | "Advertisement" |
*
* @param {Event_Type_Label_AdvertisementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_advertisement = /** @type {((inputs?: Event_Type_Label_AdvertisementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_AdvertisementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_advertisement(inputs)
	return __zh.event_type_label_advertisement(inputs)
});
/**
* | output |
* | --- |
* | "Message Deletion" |
*
* @param {Event_Type_Label_Message_DeletionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_message_deletion = /** @type {((inputs?: Event_Type_Label_Message_DeletionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Message_DeletionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_type_label_message_deletion(inputs)
	return __zh.event_type_label_message_deletion(inputs)
});
/**
* | output |
* | --- |
* | "Failed to read organization members." |
*
* @param {Event_Settings_Read_Members_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_members_error = /** @type {((inputs?: Event_Settings_Read_Members_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Members_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_read_members_error(inputs)
	return __zh.event_settings_read_members_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to read member account bindings." |
*
* @param {Event_Settings_Read_Bindings_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_bindings_error = /** @type {((inputs?: Event_Settings_Read_Bindings_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Bindings_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_read_bindings_error(inputs)
	return __zh.event_settings_read_bindings_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to read event_type_config." |
*
* @param {Event_Settings_Read_Type_Config_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_type_config_error = /** @type {((inputs?: Event_Settings_Read_Type_Config_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Type_Config_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_read_type_config_error(inputs)
	return __zh.event_settings_read_type_config_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to read event_notification_target." |
*
* @param {Event_Settings_Read_Notification_Target_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_notification_target_error = /** @type {((inputs?: Event_Settings_Read_Notification_Target_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Notification_Target_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_read_notification_target_error(inputs)
	return __zh.event_settings_read_notification_target_error(inputs)
});
/**
* | output |
* | --- |
* | "Invalid type key. Please review it and try again." |
*
* @param {Event_Settings_Invalid_Type_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_invalid_type_key = /** @type {((inputs?: Event_Settings_Invalid_Type_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Invalid_Type_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_invalid_type_key(inputs)
	return __zh.event_settings_invalid_type_key(inputs)
});
/**
* | output |
* | --- |
* | "Type name cannot be empty." |
*
* @param {Event_Settings_Type_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_type_name_required = /** @type {((inputs?: Event_Settings_Type_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Type_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_type_name_required(inputs)
	return __zh.event_settings_type_name_required(inputs)
});
/**
* | output |
* | --- |
* | "The database has not finished the event_type_config migration, so this type config cannot be saved yet." |
*
* @param {Event_Settings_Missing_Type_Config_MigrationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_missing_type_config_migration = /** @type {((inputs?: Event_Settings_Missing_Type_Config_MigrationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Missing_Type_Config_MigrationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_missing_type_config_migration(inputs)
	return __zh.event_settings_missing_type_config_migration(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save event type config." |
*
* @param {Event_Settings_Save_Type_Config_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_save_type_config_error = /** @type {((inputs?: Event_Settings_Save_Type_Config_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Save_Type_Config_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_save_type_config_error(inputs)
	return __zh.event_settings_save_type_config_error(inputs)
});
/**
* | output |
* | --- |
* | "A valid config ID was not returned after saving. Please refresh and try again." |
*
* @param {Event_Settings_Missing_Saved_Config_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_missing_saved_config_id = /** @type {((inputs?: Event_Settings_Missing_Saved_Config_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Missing_Saved_Config_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_missing_saved_config_id(inputs)
	return __zh.event_settings_missing_saved_config_id(inputs)
});
/**
* | output |
* | --- |
* | "Responsible member directory is still loading. Please try saving again later." |
*
* @param {Event_Settings_Members_Not_LoadedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_members_not_loaded = /** @type {((inputs?: Event_Settings_Members_Not_LoadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Members_Not_LoadedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_members_not_loaded(inputs)
	return __zh.event_settings_members_not_loaded(inputs)
});
/**
* | output |
* | --- |
* | "The channel list is still loading. Please refresh and try again." |
*
* @param {Event_Settings_Channels_Not_LoadedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_channels_not_loaded = /** @type {((inputs?: Event_Settings_Channels_Not_LoadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Channels_Not_LoadedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_channels_not_loaded(inputs)
	return __zh.event_settings_channels_not_loaded(inputs)
});
/**
* | output |
* | --- |
* | "Failed to clear old notification targets." |
*
* @param {Event_Settings_Clear_Targets_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_clear_targets_error = /** @type {((inputs?: Event_Settings_Clear_Targets_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Clear_Targets_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_clear_targets_error(inputs)
	return __zh.event_settings_clear_targets_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to write notification targets." |
*
* @param {Event_Settings_Write_Target_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_write_target_error = /** @type {((inputs?: Event_Settings_Write_Target_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Write_Target_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_write_target_error(inputs)
	return __zh.event_settings_write_target_error(inputs)
});
/**
* | output |
* | --- |
* | "Event type config has been saved." |
*
* @param {Event_Settings_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_saved = /** @type {((inputs?: Event_Settings_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_saved(inputs)
	return __zh.event_settings_saved(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save event type config. Please try again later." |
*
* @param {Event_Settings_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_save_error = /** @type {((inputs?: Event_Settings_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_save_error(inputs)
	return __zh.event_settings_save_error(inputs)
});
/**
* | output |
* | --- |
* | "No notifications" |
*
* @param {Event_Settings_Notify_OffInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_off = /** @type {((inputs?: Event_Settings_Notify_OffInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_OffInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_notify_off(inputs)
	return __zh.event_settings_notify_off(inputs)
});
/**
* | output |
* | --- |
* | "Notify" |
*
* @param {Event_Settings_Notify_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_on = /** @type {((inputs?: Event_Settings_Notify_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.event_settings_notify_on(inputs)
	return __zh.event_settings_notify_on(inputs)
});
/**
* | output |
* | --- |
* | "Not connected" |
*
* @param {Integration_Status_Not_ConnectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_not_connected = /** @type {((inputs?: Integration_Status_Not_ConnectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_Not_ConnectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_status_not_connected(inputs)
	return __zh.integration_status_not_connected(inputs)
});
/**
* | output |
* | --- |
* | "Degraded (retry available)" |
*
* @param {Integration_Status_Degraded_RetryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_degraded_retry = /** @type {((inputs?: Integration_Status_Degraded_RetryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_Degraded_RetryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_status_degraded_retry(inputs)
	return __zh.integration_status_degraded_retry(inputs)
});
/**
* | output |
* | --- |
* | "Connected" |
*
* @param {Integration_Status_ConnectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_connected = /** @type {((inputs?: Integration_Status_ConnectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_ConnectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_status_connected(inputs)
	return __zh.integration_status_connected(inputs)
});
/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Integration_Status_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_disabled = /** @type {((inputs?: Integration_Status_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_status_disabled(inputs)
	return __zh.integration_status_disabled(inputs)
});
/**
* | output |
* | --- |
* | "Manual sync completed." |
*
* @param {Integration_Sync_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success = /** @type {((inputs?: Integration_Sync_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_sync_success(inputs)
	return __zh.integration_sync_success(inputs)
});
/**
* | output |
* | --- |
* | "Manual sync completed: {channels} channel(s), {roles} role(s)." |
*
* @param {Integration_Sync_Success_Channels_RolesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success_channels_roles = /** @type {((inputs: Integration_Sync_Success_Channels_RolesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_Success_Channels_RolesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_sync_success_channels_roles(inputs)
	return __zh.integration_sync_success_channels_roles(inputs)
});
/**
* | output |
* | --- |
* | "Manual sync completed: {channels} channel(s)." |
*
* @param {Integration_Sync_Success_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success_channels = /** @type {((inputs: Integration_Sync_Success_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_Success_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_sync_success_channels(inputs)
	return __zh.integration_sync_success_channels(inputs)
});
/**
* | output |
* | --- |
* | "{platform} connected and initial backfill completed." |
*
* @param {Integration_Connected_Backfill_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connected_backfill_success = /** @type {((inputs: Integration_Connected_Backfill_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Connected_Backfill_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_connected_backfill_success(inputs)
	return __zh.integration_connected_backfill_success(inputs)
});
/**
* | output |
* | --- |
* | "{platform} connected, but initial backfill failed. You can retry with manual sync." |
*
* @param {Integration_Connected_Backfill_DegradedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connected_backfill_degraded = /** @type {((inputs: Integration_Connected_Backfill_DegradedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Connected_Backfill_DegradedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_connected_backfill_degraded(inputs)
	return __zh.integration_connected_backfill_degraded(inputs)
});
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
	if (locale === "en") return __en.integration_create_install_error(inputs)
	return __zh.integration_create_install_error(inputs)
});
/**
* | output |
* | --- |
* | "Manual sync failed." |
*
* @param {Integration_Manual_Sync_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_manual_sync_error = /** @type {((inputs?: Integration_Manual_Sync_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Manual_Sync_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_manual_sync_error(inputs)
	return __zh.integration_manual_sync_error(inputs)
});
/**
* | output |
* | --- |
* | "Only Owner/Admin can operate." |
*
* @param {Integration_Owner_Admin_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_owner_admin_only = /** @type {((inputs?: Integration_Owner_Admin_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Owner_Admin_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_owner_admin_only(inputs)
	return __zh.integration_owner_admin_only(inputs)
});
/**
* | output |
* | --- |
* | "Add Community" |
*
* @param {Integration_Add_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_add_community = /** @type {((inputs?: Integration_Add_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Add_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_add_community(inputs)
	return __zh.integration_add_community(inputs)
});
/**
* | output |
* | --- |
* | "No communities yet. Click Add Community in the top-right." |
*
* @param {Integration_Empty_With_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_empty_with_company = /** @type {((inputs?: Integration_Empty_With_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Empty_With_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_empty_with_company(inputs)
	return __zh.integration_empty_with_company(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company first, then add a community." |
*
* @param {Integration_Empty_Without_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_empty_without_company = /** @type {((inputs?: Integration_Empty_Without_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Empty_Without_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_empty_without_company(inputs)
	return __zh.integration_empty_without_company(inputs)
});
/**
* | output |
* | --- |
* | "Add {platform} Community" |
*
* @param {Integration_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_dialog_title = /** @type {((inputs: Integration_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_dialog_title(inputs)
	return __zh.integration_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "1. Connect {platform}" |
*
* @param {Integration_Step_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_connect = /** @type {((inputs: Integration_Step_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_step_connect(inputs)
	return __zh.integration_step_connect(inputs)
});
/**
* | output |
* | --- |
* | "2. Sync communities" |
*
* @param {Integration_Step_SyncInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_sync = /** @type {((inputs?: Integration_Step_SyncInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_SyncInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_step_sync(inputs)
	return __zh.integration_step_sync(inputs)
});
/**
* | output |
* | --- |
* | "3. Refresh community list" |
*
* @param {Integration_Step_RefreshInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_step_refresh = /** @type {((inputs?: Integration_Step_RefreshInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Step_RefreshInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_step_refresh(inputs)
	return __zh.integration_step_refresh(inputs)
});
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
	if (locale === "en") return __en.integration_creating_install_link(inputs)
	return __zh.integration_creating_install_link(inputs)
});
/**
* | output |
* | --- |
* | "Reconnect {platform}" |
*
* @param {Integration_ReconnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_reconnect = /** @type {((inputs: Integration_ReconnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_ReconnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_reconnect(inputs)
	return __zh.integration_reconnect(inputs)
});
/**
* | output |
* | --- |
* | "Connect {platform}" |
*
* @param {Integration_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_connect = /** @type {((inputs: Integration_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_connect(inputs)
	return __zh.integration_connect(inputs)
});
/**
* | output |
* | --- |
* | "Syncing..." |
*
* @param {Integration_SyncingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_syncing = /** @type {((inputs?: Integration_SyncingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_SyncingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_syncing(inputs)
	return __zh.integration_syncing(inputs)
});
/**
* | output |
* | --- |
* | "Manual sync" |
*
* @param {Integration_Manual_SyncInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_manual_sync = /** @type {((inputs?: Integration_Manual_SyncInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Manual_SyncInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_manual_sync(inputs)
	return __zh.integration_manual_sync(inputs)
});
/**
* | output |
* | --- |
* | "Refresh community list" |
*
* @param {Integration_Refresh_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_refresh_communities = /** @type {((inputs?: Integration_Refresh_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Refresh_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.integration_refresh_communities(inputs)
	return __zh.integration_refresh_communities(inputs)
});
/**
* | output |
* | --- |
* | "Text" |
*
* @param {Discord_Channel_TextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_text = /** @type {((inputs?: Discord_Channel_TextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_TextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_text(inputs)
	return __zh.discord_channel_text(inputs)
});
/**
* | output |
* | --- |
* | "Voice" |
*
* @param {Discord_Channel_VoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_voice = /** @type {((inputs?: Discord_Channel_VoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_VoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_voice(inputs)
	return __zh.discord_channel_voice(inputs)
});
/**
* | output |
* | --- |
* | "Category" |
*
* @param {Discord_Channel_CategoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_category = /** @type {((inputs?: Discord_Channel_CategoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_CategoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_category(inputs)
	return __zh.discord_channel_category(inputs)
});
/**
* | output |
* | --- |
* | "Announcement" |
*
* @param {Discord_Channel_AnnouncementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_announcement = /** @type {((inputs?: Discord_Channel_AnnouncementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_AnnouncementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_announcement(inputs)
	return __zh.discord_channel_announcement(inputs)
});
/**
* | output |
* | --- |
* | "Stage" |
*
* @param {Discord_Channel_StageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_stage = /** @type {((inputs?: Discord_Channel_StageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_StageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_stage(inputs)
	return __zh.discord_channel_stage(inputs)
});
/**
* | output |
* | --- |
* | "Forum" |
*
* @param {Discord_Channel_ForumInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_forum = /** @type {((inputs?: Discord_Channel_ForumInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_ForumInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_forum(inputs)
	return __zh.discord_channel_forum(inputs)
});
/**
* | output |
* | --- |
* | "Channel" |
*
* @param {Discord_Channel_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_default = /** @type {((inputs?: Discord_Channel_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.discord_channel_default(inputs)
	return __zh.discord_channel_default(inputs)
});
/**
* | output |
* | --- |
* | "Private" |
*
* @param {Slack_Channel_PrivateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_private = /** @type {((inputs?: Slack_Channel_PrivateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_PrivateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_private(inputs)
	return __zh.slack_channel_private(inputs)
});
/**
* | output |
* | --- |
* | "Public" |
*
* @param {Slack_Channel_PublicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_public = /** @type {((inputs?: Slack_Channel_PublicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_PublicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_public(inputs)
	return __zh.slack_channel_public(inputs)
});
/**
* | output |
* | --- |
* | "Direct Message" |
*
* @param {Slack_Channel_Direct_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_direct_message = /** @type {((inputs?: Slack_Channel_Direct_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_Direct_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_direct_message(inputs)
	return __zh.slack_channel_direct_message(inputs)
});
/**
* | output |
* | --- |
* | "Multi Person DM" |
*
* @param {Slack_Channel_Multi_Person_DmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_multi_person_dm = /** @type {((inputs?: Slack_Channel_Multi_Person_DmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_Multi_Person_DmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_multi_person_dm(inputs)
	return __zh.slack_channel_multi_person_dm(inputs)
});
/**
* | output |
* | --- |
* | "Group" |
*
* @param {Slack_Channel_GroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_group = /** @type {((inputs?: Slack_Channel_GroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_GroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_group(inputs)
	return __zh.slack_channel_group(inputs)
});
/**
* | output |
* | --- |
* | "Channel" |
*
* @param {Slack_Channel_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const slack_channel_default = /** @type {((inputs?: Slack_Channel_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Slack_Channel_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.slack_channel_default(inputs)
	return __zh.slack_channel_default(inputs)
});
/**
* | output |
* | --- |
* | "Failed to remove the member. Please try again later." |
*
* @param {Settings_Remove_Member_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_remove_member_error = /** @type {((inputs?: Settings_Remove_Member_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Remove_Member_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_remove_member_error(inputs)
	return __zh.settings_remove_member_error(inputs)
});
/**
* | output |
* | --- |
* | "{name} uploaded and processed successfully" |
*
* @param {Knowledge_Upload_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_completed = /** @type {((inputs: Knowledge_Upload_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_completed(inputs)
	return __zh.knowledge_upload_completed(inputs)
});
/**
* | output |
* | --- |
* | "Web crawl completed: {url}" |
*
* @param {Knowledge_Web_Crawl_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_web_crawl_completed = /** @type {((inputs: Knowledge_Web_Crawl_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Web_Crawl_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_web_crawl_completed(inputs)
	return __zh.knowledge_web_crawl_completed(inputs)
});
/**
* | output |
* | --- |
* | "Close result panel" |
*
* @param {Knowledge_Close_Result_PanelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_result_panel = /** @type {((inputs?: Knowledge_Close_Result_PanelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Result_PanelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_close_result_panel(inputs)
	return __zh.knowledge_close_result_panel(inputs)
});
/**
* | output |
* | --- |
* | "Close detail popup" |
*
* @param {Knowledge_Close_Detail_PopupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_detail_popup = /** @type {((inputs?: Knowledge_Close_Detail_PopupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Detail_PopupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_close_detail_popup(inputs)
	return __zh.knowledge_close_detail_popup(inputs)
});
/**
* | output |
* | --- |
* | "Close document popup" |
*
* @param {Knowledge_Close_Document_PopupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_document_popup = /** @type {((inputs?: Knowledge_Close_Document_PopupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Document_PopupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_close_document_popup(inputs)
	return __zh.knowledge_close_document_popup(inputs)
});
/**
* | output |
* | --- |
* | "Knowledge list" |
*
* @param {Knowledge_Chunk_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_chunk_list = /** @type {((inputs?: Knowledge_Chunk_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Chunk_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_chunk_list(inputs)
	return __zh.knowledge_chunk_list(inputs)
});
/**
* | output |
* | --- |
* | "Close image preview" |
*
* @param {Knowledge_Close_Image_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_image_preview = /** @type {((inputs?: Knowledge_Close_Image_PreviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Image_PreviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_close_image_preview(inputs)
	return __zh.knowledge_close_image_preview(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Knowledge_Delete_Confirm_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_action = /** @type {((inputs?: Knowledge_Delete_Confirm_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_delete_confirm_action(inputs)
	return __zh.knowledge_delete_confirm_action(inputs)
});
/**
* | output |
* | --- |
* | "This action cannot be undone:" |
*
* @param {Knowledge_Delete_Confirm_Desc_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_desc_prefix = /** @type {((inputs?: Knowledge_Delete_Confirm_Desc_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_Desc_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_delete_confirm_desc_prefix(inputs)
	return __zh.knowledge_delete_confirm_desc_prefix(inputs)
});
/**
* | output |
* | --- |
* | "Delete knowledge?" |
*
* @param {Knowledge_Delete_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_title = /** @type {((inputs?: Knowledge_Delete_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_delete_confirm_title(inputs)
	return __zh.knowledge_delete_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Delete failed" |
*
* @param {Knowledge_Delete_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_failed = /** @type {((inputs?: Knowledge_Delete_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_delete_failed(inputs)
	return __zh.knowledge_delete_failed(inputs)
});
/**
* | output |
* | --- |
* | "Deleting..." |
*
* @param {Knowledge_DeletingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_deleting = /** @type {((inputs?: Knowledge_DeletingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_DeletingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_deleting(inputs)
	return __zh.knowledge_deleting(inputs)
});
/**
* | output |
* | --- |
* | "Document Insight" |
*
* @param {Knowledge_Doc_Insight_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_doc_insight_title = /** @type {((inputs?: Knowledge_Doc_Insight_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Doc_Insight_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_doc_insight_title(inputs)
	return __zh.knowledge_doc_insight_title(inputs)
});
/**
* | output |
* | --- |
* | "Title" |
*
* @param {Knowledge_Doc_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_doc_title = /** @type {((inputs?: Knowledge_Doc_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Doc_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_doc_title(inputs)
	return __zh.knowledge_doc_title(inputs)
});
/**
* | output |
* | --- |
* | "Generated Knowledge" |
*
* @param {Knowledge_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_generated_count = /** @type {((inputs?: Knowledge_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_generated_count(inputs)
	return __zh.knowledge_generated_count(inputs)
});
/**
* | output |
* | --- |
* | "Image Attachments" |
*
* @param {Knowledge_Image_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_image_attachments = /** @type {((inputs?: Knowledge_Image_AttachmentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Image_AttachmentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_image_attachments(inputs)
	return __zh.knowledge_image_attachments(inputs)
});
/**
* | output |
* | --- |
* | "Click to preview image" |
*
* @param {Knowledge_Image_Preview_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_image_preview_hint = /** @type {((inputs?: Knowledge_Image_Preview_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Image_Preview_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_image_preview_hint(inputs)
	return __zh.knowledge_image_preview_hint(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load attachments" |
*
* @param {Knowledge_Load_Attachments_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_load_attachments_failed = /** @type {((inputs?: Knowledge_Load_Attachments_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Load_Attachments_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_load_attachments_failed(inputs)
	return __zh.knowledge_load_attachments_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load knowledge rows" |
*
* @param {Knowledge_Load_Chunks_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_load_chunks_failed = /** @type {((inputs?: Knowledge_Load_Chunks_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Load_Chunks_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_load_chunks_failed(inputs)
	return __zh.knowledge_load_chunks_failed(inputs)
});
/**
* | output |
* | --- |
* | "Manual knowledge" |
*
* @param {Knowledge_Manual_Knowledge_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_manual_knowledge_prefix = /** @type {((inputs?: Knowledge_Manual_Knowledge_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Manual_Knowledge_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_manual_knowledge_prefix(inputs)
	return __zh.knowledge_manual_knowledge_prefix(inputs)
});
/**
* | output |
* | --- |
* | "No knowledge rows in this document" |
*
* @param {Knowledge_No_Chunk_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_chunk_data = /** @type {((inputs?: Knowledge_No_Chunk_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Chunk_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_no_chunk_data(inputs)
	return __zh.knowledge_no_chunk_data(inputs)
});
/**
* | output |
* | --- |
* | "No previewable image attachments" |
*
* @param {Knowledge_No_Image_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_image_attachments = /** @type {((inputs?: Knowledge_No_Image_AttachmentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Image_AttachmentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_no_image_attachments(inputs)
	return __zh.knowledge_no_image_attachments(inputs)
});
/**
* | output |
* | --- |
* | "Document URL not found" |
*
* @param {Knowledge_No_Source_Document_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_source_document_url = /** @type {((inputs?: Knowledge_No_Source_Document_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Source_Document_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_no_source_document_url(inputs)
	return __zh.knowledge_no_source_document_url(inputs)
});
/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Knowledge_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_preview = /** @type {((inputs?: Knowledge_PreviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_PreviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_preview(inputs)
	return __zh.knowledge_preview(inputs)
});
/**
* | output |
* | --- |
* | "Assistant" |
*
* @param {Knowledge_Role_AssistantInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_role_assistant = /** @type {((inputs?: Knowledge_Role_AssistantInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Role_AssistantInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_role_assistant(inputs)
	return __zh.knowledge_role_assistant(inputs)
});
/**
* | output |
* | --- |
* | "User" |
*
* @param {Knowledge_Role_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_role_user = /** @type {((inputs?: Knowledge_Role_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Role_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_role_user(inputs)
	return __zh.knowledge_role_user(inputs)
});
/**
* | output |
* | --- |
* | "Search knowledge" |
*
* @param {Knowledge_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_search_placeholder = /** @type {((inputs?: Knowledge_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_search_placeholder(inputs)
	return __zh.knowledge_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "No session messages found" |
*
* @param {Knowledge_Session_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_session_not_found = /** @type {((inputs?: Knowledge_Session_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Session_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_session_not_found(inputs)
	return __zh.knowledge_session_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Source" |
*
* @param {Knowledge_Source_FilterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_filter = /** @type {((inputs?: Knowledge_Source_FilterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_FilterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_filter(inputs)
	return __zh.knowledge_source_filter(inputs)
});
/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Knowledge_Source_ManualInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_manual = /** @type {((inputs?: Knowledge_Source_ManualInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_ManualInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_manual(inputs)
	return __zh.knowledge_source_manual(inputs)
});
/**
* | output |
* | --- |
* | "Official Docs" |
*
* @param {Knowledge_Source_Official_DocInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_official_doc = /** @type {((inputs?: Knowledge_Source_Official_DocInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Official_DocInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_official_doc(inputs)
	return __zh.knowledge_source_official_doc(inputs)
});
/**
* | output |
* | --- |
* | "Web Crawl" |
*
* @param {Knowledge_Source_Web_CrawlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_web_crawl = /** @type {((inputs?: Knowledge_Source_Web_CrawlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Web_CrawlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_web_crawl(inputs)
	return __zh.knowledge_source_web_crawl(inputs)
});
/**
* | output |
* | --- |
* | "Session Record" |
*
* @param {Knowledge_Source_Session_RecordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_session_record = /** @type {((inputs?: Knowledge_Source_Session_RecordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Session_RecordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_session_record(inputs)
	return __zh.knowledge_source_session_record(inputs)
});
/**
* | output |
* | --- |
* | "Knowledge Source" |
*
* @param {Knowledge_Source_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_title = /** @type {((inputs?: Knowledge_Source_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_source_title(inputs)
	return __zh.knowledge_source_title(inputs)
});
/**
* | output |
* | --- |
* | "The crawler starts from this URL and pushes extracted content into the knowledge pipeline." |
*
* @param {Knowledge_Upload_Crawl_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_hint = /** @type {((inputs?: Knowledge_Upload_Crawl_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_hint(inputs)
	return __zh.knowledge_upload_crawl_hint(inputs)
});
/**
* | output |
* | --- |
* | "Max Depth" |
*
* @param {Knowledge_Upload_Crawl_Max_Depth_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_max_depth_label = /** @type {((inputs?: Knowledge_Upload_Crawl_Max_Depth_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Max_Depth_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_max_depth_label(inputs)
	return __zh.knowledge_upload_crawl_max_depth_label(inputs)
});
/**
* | output |
* | --- |
* | "Max Pages" |
*
* @param {Knowledge_Upload_Crawl_Max_Pages_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_max_pages_label = /** @type {((inputs?: Knowledge_Upload_Crawl_Max_Pages_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Max_Pages_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_max_pages_label(inputs)
	return __zh.knowledge_upload_crawl_max_pages_label(inputs)
});
/**
* | output |
* | --- |
* | "Crawl URL" |
*
* @param {Knowledge_Upload_Crawl_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_tab = /** @type {((inputs?: Knowledge_Upload_Crawl_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_tab(inputs)
	return __zh.knowledge_upload_crawl_tab(inputs)
});
/**
* | output |
* | --- |
* | "Source URL" |
*
* @param {Knowledge_Upload_Crawl_Url_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_label = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_url_label(inputs)
	return __zh.knowledge_upload_crawl_url_label(inputs)
});
/**
* | output |
* | --- |
* | "e.g. https://docs.example.com" |
*
* @param {Knowledge_Upload_Crawl_Url_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_placeholder = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_url_placeholder(inputs)
	return __zh.knowledge_upload_crawl_url_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a valid URL (http/https)" |
*
* @param {Knowledge_Upload_Crawl_Url_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_required = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_crawl_url_required(inputs)
	return __zh.knowledge_upload_crawl_url_required(inputs)
});
/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Knowledge_Tab_DocsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_tab_docs = /** @type {((inputs?: Knowledge_Tab_DocsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Tab_DocsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_tab_docs(inputs)
	return __zh.knowledge_tab_docs(inputs)
});
/**
* | output |
* | --- |
* | "All Knowledge" |
*
* @param {Knowledge_Tab_ItemsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_tab_items = /** @type {((inputs?: Knowledge_Tab_ItemsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Tab_ItemsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_tab_items(inputs)
	return __zh.knowledge_tab_items(inputs)
});
/**
* | output |
* | --- |
* | "Total" |
*
* @param {Knowledge_Total_Count_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_total_count_prefix = /** @type {((inputs?: Knowledge_Total_Count_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Total_Count_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_total_count_prefix(inputs)
	return __zh.knowledge_total_count_prefix(inputs)
});
/**
* | output |
* | --- |
* | "" |
*
* @param {Knowledge_Total_Count_SuffixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_total_count_suffix = /** @type {((inputs?: Knowledge_Total_Count_SuffixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Total_Count_SuffixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_total_count_suffix(inputs)
	return __zh.knowledge_total_count_suffix(inputs)
});
/**
* | output |
* | --- |
* | "Total" |
*
* @param {Knowledge_Total_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_total_prefix = /** @type {((inputs?: Knowledge_Total_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Total_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_total_prefix(inputs)
	return __zh.knowledge_total_prefix(inputs)
});
/**
* | output |
* | --- |
* | "Type/Size" |
*
* @param {Knowledge_Type_SizeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_type_size = /** @type {((inputs?: Knowledge_Type_SizeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Type_SizeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_type_size(inputs)
	return __zh.knowledge_type_size(inputs)
});
/**
* | output |
* | --- |
* | "Upload Knowledge" |
*
* @param {Knowledge_Upload_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_dialog_title = /** @type {((inputs?: Knowledge_Upload_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_dialog_title(inputs)
	return __zh.knowledge_upload_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "Click to upload" |
*
* @param {Knowledge_Upload_Doc_ClickInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_click = /** @type {((inputs?: Knowledge_Upload_Doc_ClickInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_ClickInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_doc_click(inputs)
	return __zh.knowledge_upload_doc_click(inputs)
});
/**
* | output |
* | --- |
* | "Or drag file here" |
*
* @param {Knowledge_Upload_Doc_Drag_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_drag_hint = /** @type {((inputs?: Knowledge_Upload_Doc_Drag_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_Drag_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_doc_drag_hint(inputs)
	return __zh.knowledge_upload_doc_drag_hint(inputs)
});
/**
* | output |
* | --- |
* | "Supports PDF / DOC / DOCX / MD" |
*
* @param {Knowledge_Upload_Doc_Format_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_format_hint = /** @type {((inputs?: Knowledge_Upload_Doc_Format_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_Format_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_doc_format_hint(inputs)
	return __zh.knowledge_upload_doc_format_hint(inputs)
});
/**
* | output |
* | --- |
* | "Upload Document" |
*
* @param {Knowledge_Upload_Doc_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_tab = /** @type {((inputs?: Knowledge_Upload_Doc_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_doc_tab(inputs)
	return __zh.knowledge_upload_doc_tab(inputs)
});
/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Knowledge_Upload_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_knowledge = /** @type {((inputs?: Knowledge_Upload_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_knowledge(inputs)
	return __zh.knowledge_upload_knowledge(inputs)
});
/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Knowledge_Upload_Manual_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_manual_tab = /** @type {((inputs?: Knowledge_Upload_Manual_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Manual_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_manual_tab(inputs)
	return __zh.knowledge_upload_manual_tab(inputs)
});
/**
* | output |
* | --- |
* | "Selected Files" |
*
* @param {Knowledge_Upload_Selected_Files_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_selected_files_title = /** @type {((inputs?: Knowledge_Upload_Selected_Files_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Selected_Files_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_selected_files_title(inputs)
	return __zh.knowledge_upload_selected_files_title(inputs)
});
/**
* | output |
* | --- |
* | "Selected:" |
*
* @param {Knowledge_Upload_Selected_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_selected_prefix = /** @type {((inputs?: Knowledge_Upload_Selected_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Selected_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_selected_prefix(inputs)
	return __zh.knowledge_upload_selected_prefix(inputs)
});
/**
* | output |
* | --- |
* | "Confirm Upload" |
*
* @param {Knowledge_Upload_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_submit = /** @type {((inputs?: Knowledge_Upload_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_upload_submit(inputs)
	return __zh.knowledge_upload_submit(inputs)
});
/**
* | output |
* | --- |
* | "Uploader" |
*
* @param {Knowledge_UploaderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_uploader = /** @type {((inputs?: Knowledge_UploaderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_UploaderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_uploader(inputs)
	return __zh.knowledge_uploader(inputs)
});
/**
* | output |
* | --- |
* | "Uploaded At" |
*
* @param {Knowledge_Uploaded_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_uploaded_at = /** @type {((inputs?: Knowledge_Uploaded_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Uploaded_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_uploaded_at(inputs)
	return __zh.knowledge_uploaded_at(inputs)
});
/**
* | output |
* | --- |
* | "Processing..." |
*
* @param {Knowledge_UploadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_uploading = /** @type {((inputs?: Knowledge_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_uploading(inputs)
	return __zh.knowledge_uploading(inputs)
});
/**
* | output |
* | --- |
* | "View document" |
*
* @param {Knowledge_View_DocumentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_view_document = /** @type {((inputs?: Knowledge_View_DocumentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_View_DocumentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_view_document(inputs)
	return __zh.knowledge_view_document(inputs)
});
/**
* | output |
* | --- |
* | "View source" |
*
* @param {Knowledge_View_SourceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_view_source = /** @type {((inputs?: Knowledge_View_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_View_SourceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_view_source(inputs)
	return __zh.knowledge_view_source(inputs)
});
/**
* | output |
* | --- |
* | "Unknown channel" |
*
* @param {Session_Unknown_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const session_unknown_channel = /** @type {((inputs?: Session_Unknown_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Session_Unknown_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.session_unknown_channel(inputs)
	return __zh.session_unknown_channel(inputs)
});
/**
* | output |
* | --- |
* | "Lucius logo" |
*
* @param {App_Logo_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_logo_alt = /** @type {((inputs?: App_Logo_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_Logo_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.app_logo_alt(inputs)
	return __zh.app_logo_alt(inputs)
});
/**
* | output |
* | --- |
* | "https://example.com" |
*
* @param {Onboarding_Company_Website_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_website_placeholder = /** @type {((inputs?: Onboarding_Company_Website_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Website_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_company_website_placeholder(inputs)
	return __zh.onboarding_company_website_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "member@example.com" |
*
* @param {Member_Management_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_email_placeholder = /** @type {((inputs?: Member_Management_Email_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Email_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.member_management_email_placeholder(inputs)
	return __zh.member_management_email_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "You are not signed in. Please sign in again and retry." |
*
* @param {Service_Login_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_login_required = /** @type {((inputs?: Service_Login_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Login_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_login_required(inputs)
	return __zh.service_login_required(inputs)
});
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
	if (locale === "en") return __en.service_company_update_permission_denied(inputs)
	return __zh.service_company_update_permission_denied(inputs)
});
/**
* | output |
* | --- |
* | "Current company info was not found. Refresh and try again." |
*
* @param {Service_Company_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_company_not_found = /** @type {((inputs?: Service_Company_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Company_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_company_not_found(inputs)
	return __zh.service_company_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a company name." |
*
* @param {Service_Company_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_company_name_required = /** @type {((inputs?: Service_Company_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Company_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_company_name_required(inputs)
	return __zh.service_company_name_required(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create the workspace. Please try again later." |
*
* @param {Service_Workspace_Create_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workspace_create_failed = /** @type {((inputs?: Service_Workspace_Create_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workspace_Create_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workspace_create_failed(inputs)
	return __zh.service_workspace_create_failed(inputs)
});
/**
* | output |
* | --- |
* | "Workspace creation succeeded, but the company ID was missing." |
*
* @param {Service_Workspace_Create_Missing_Company_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workspace_create_missing_company_id = /** @type {((inputs?: Service_Workspace_Create_Missing_Company_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workspace_Create_Missing_Company_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workspace_create_missing_company_id(inputs)
	return __zh.service_workspace_create_missing_company_id(inputs)
});
/**
* | output |
* | --- |
* | "Avatar upload succeeded, but no public URL was returned." |
*
* @param {Service_Avatar_Public_Url_MissingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_avatar_public_url_missing = /** @type {((inputs?: Service_Avatar_Public_Url_MissingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Avatar_Public_Url_MissingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_avatar_public_url_missing(inputs)
	return __zh.service_avatar_public_url_missing(inputs)
});
/**
* | output |
* | --- |
* | "This nickname is already in use in the current workspace. Please choose another one." |
*
* @param {Service_Profile_Name_ConflictInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_profile_name_conflict = /** @type {((inputs?: Service_Profile_Name_ConflictInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Profile_Name_ConflictInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_profile_name_conflict(inputs)
	return __zh.service_profile_name_conflict(inputs)
});
/**
* | output |
* | --- |
* | "You are not an active member of the current company, or the invitation has not taken effect yet. Please sign in again and retry." |
*
* @param {Service_Profile_Member_InactiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_profile_member_inactive = /** @type {((inputs?: Service_Profile_Member_InactiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Profile_Member_InactiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_profile_member_inactive(inputs)
	return __zh.service_profile_member_inactive(inputs)
});
/**
* | output |
* | --- |
* | "Discord integration request failed." |
*
* @param {Service_Discord_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_discord_request_failed = /** @type {((inputs?: Service_Discord_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Discord_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_discord_request_failed(inputs)
	return __zh.service_discord_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "Slack integration request failed." |
*
* @param {Service_Slack_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_slack_request_failed = /** @type {((inputs?: Service_Slack_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Slack_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_slack_request_failed(inputs)
	return __zh.service_slack_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "Telegram integration request failed." |
*
* @param {Service_Telegram_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_telegram_request_failed = /** @type {((inputs?: Service_Telegram_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Telegram_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_telegram_request_failed(inputs)
	return __zh.service_telegram_request_failed(inputs)
});
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
	if (locale === "en") return __en.service_feishu_channels_read_failed(inputs)
	return __zh.service_feishu_channels_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "Member management request failed. Please try again later." |
*
* @param {Service_Member_Management_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_member_management_request_failed = /** @type {((inputs?: Service_Member_Management_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Member_Management_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_member_management_request_failed(inputs)
	return __zh.service_member_management_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to report member activity. Please try again later." |
*
* @param {Service_Member_Activity_Report_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_member_activity_report_failed = /** @type {((inputs?: Service_Member_Activity_Report_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Member_Activity_Report_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_member_activity_report_failed(inputs)
	return __zh.service_member_activity_report_failed(inputs)
});
/**
* | output |
* | --- |
* | "Event action failed. Please try again later." |
*
* @param {Service_Event_Action_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_action_request_failed = /** @type {((inputs?: Service_Event_Action_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Action_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_event_action_request_failed(inputs)
	return __zh.service_event_action_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "Billing request failed. Please try again later." |
*
* @param {Service_Billing_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_billing_request_failed = /** @type {((inputs?: Service_Billing_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Billing_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_billing_request_failed(inputs)
	return __zh.service_billing_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "Client chat request failed. Please try again later." |
*
* @param {Service_Client_Chat_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_client_chat_request_failed = /** @type {((inputs?: Service_Client_Chat_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Client_Chat_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_client_chat_request_failed(inputs)
	return __zh.service_client_chat_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "The workgroup settings table has not been created yet. Please apply the latest database migration first." |
*
* @param {Service_Workgroup_Table_MissingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_table_missing = /** @type {((inputs?: Service_Workgroup_Table_MissingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Table_MissingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workgroup_table_missing(inputs)
	return __zh.service_workgroup_table_missing(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load workgroup settings." |
*
* @param {Service_Workgroup_Fetch_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_fetch_failed = /** @type {((inputs?: Service_Workgroup_Fetch_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Fetch_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workgroup_fetch_failed(inputs)
	return __zh.service_workgroup_fetch_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save workgroup settings." |
*
* @param {Service_Workgroup_Save_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_save_failed = /** @type {((inputs?: Service_Workgroup_Save_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Save_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workgroup_save_failed(inputs)
	return __zh.service_workgroup_save_failed(inputs)
});
/**
* | output |
* | --- |
* | "Workgroup settings were saved, but the returned data is incomplete." |
*
* @param {Service_Workgroup_Save_IncompleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_save_incomplete = /** @type {((inputs?: Service_Workgroup_Save_IncompleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Save_IncompleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workgroup_save_incomplete(inputs)
	return __zh.service_workgroup_save_incomplete(inputs)
});
/**
* | output |
* | --- |
* | "Failed to delete workgroup settings." |
*
* @param {Service_Workgroup_Delete_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_delete_failed = /** @type {((inputs?: Service_Workgroup_Delete_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Delete_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_workgroup_delete_failed(inputs)
	return __zh.service_workgroup_delete_failed(inputs)
});
/**
* | output |
* | --- |
* | "The `lucius_agent` schema is not exposed in Supabase API yet. Add `lucius_agent` in Supabase Dashboard -> Project Settings -> API -> Exposed schemas, then tr..." |
*
* @param {Service_Event_Query_Schema_Not_ExposedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_schema_not_exposed = /** @type {((inputs?: Service_Event_Query_Schema_Not_ExposedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_Schema_Not_ExposedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_event_query_schema_not_exposed(inputs)
	return __zh.service_event_query_schema_not_exposed(inputs)
});
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
	if (locale === "en") return __en.service_event_query_schema_permission_denied(inputs)
	return __zh.service_event_query_schema_permission_denied(inputs)
});
/**
* | output |
* | --- |
* | "Failed to query events. Please try again later." |
*
* @param {Service_Event_Query_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_failed = /** @type {((inputs?: Service_Event_Query_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_event_query_failed(inputs)
	return __zh.service_event_query_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load event details. Please try again later." |
*
* @param {Service_Event_Detail_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_detail_request_failed = /** @type {((inputs?: Service_Event_Detail_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Detail_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_event_detail_request_failed(inputs)
	return __zh.service_event_detail_request_failed(inputs)
});
/**
* | output |
* | --- |
* | "[No text content]" |
*
* @param {Service_Event_Query_Empty_ContentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_empty_content = /** @type {((inputs?: Service_Event_Query_Empty_ContentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_Empty_ContentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.service_event_query_empty_content(inputs)
	return __zh.service_event_query_empty_content(inputs)
});
/**
* | output |
* | --- |
* | "Lucius AI" |
*
* @param {Common_Lucius_Ai_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_lucius_ai_name = /** @type {((inputs?: Common_Lucius_Ai_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Lucius_Ai_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_lucius_ai_name(inputs)
	return __zh.common_lucius_ai_name(inputs)
});
/**
* | output |
* | --- |
* | "Supergroup" |
*
* @param {Workgroup_Meta_SupergroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_meta_supergroup = /** @type {((inputs?: Workgroup_Meta_SupergroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Meta_SupergroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_meta_supergroup(inputs)
	return __zh.workgroup_meta_supergroup(inputs)
});
/**
* | output |
* | --- |
* | "This channel was not returned by the current platform list" |
*
* @param {Workgroup_Channel_Missing_From_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_channel_missing_from_platform = /** @type {((inputs?: Workgroup_Channel_Missing_From_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Channel_Missing_From_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_channel_missing_from_platform(inputs)
	return __zh.workgroup_channel_missing_from_platform(inputs)
});
/**
* | output |
* | --- |
* | "{count} workgroup(s) configured" |
*
* @param {Workgroup_Summary_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_selected = /** @type {((inputs: Workgroup_Summary_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_summary_selected(inputs)
	return __zh.workgroup_summary_selected(inputs)
});
/**
* | output |
* | --- |
* | "Choose from {count} channel(s)" |
*
* @param {Workgroup_Summary_AvailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_available = /** @type {((inputs: Workgroup_Summary_AvailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_AvailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_summary_available(inputs)
	return __zh.workgroup_summary_available(inputs)
});
/**
* | output |
* | --- |
* | "{count} workgroup(s) saved. Reconnect this platform to continue." |
*
* @param {Workgroup_Summary_Saved_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_saved_needs_connection = /** @type {((inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_Saved_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_summary_saved_needs_connection(inputs)
	return __zh.workgroup_summary_saved_needs_connection(inputs)
});
/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Workgroup_Summary_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_unavailable = /** @type {((inputs?: Workgroup_Summary_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_summary_unavailable(inputs)
	return __zh.workgroup_summary_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Connect the platform first" |
*
* @param {Workgroup_Summary_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_needs_connection = /** @type {((inputs?: Workgroup_Summary_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_summary_needs_connection(inputs)
	return __zh.workgroup_summary_needs_connection(inputs)
});
/**
* | output |
* | --- |
* | "Connected to {name}" |
*
* @param {Workgroup_Helper_Connected_NamedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_helper_connected_named = /** @type {((inputs: Workgroup_Helper_Connected_NamedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Helper_Connected_NamedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_helper_connected_named(inputs)
	return __zh.workgroup_helper_connected_named(inputs)
});
/**
* | output |
* | --- |
* | "Discord is connected. You can continue selecting workgroups." |
*
* @param {Workgroup_Discord_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_ready = /** @type {((inputs?: Workgroup_Discord_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_discord_ready(inputs)
	return __zh.workgroup_discord_ready(inputs)
});
/**
* | output |
* | --- |
* | "Connect a Discord community in Discord settings before choosing workgroups." |
*
* @param {Workgroup_Discord_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_connect_first = /** @type {((inputs?: Workgroup_Discord_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_discord_connect_first(inputs)
	return __zh.workgroup_discord_connect_first(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Discord channels." |
*
* @param {Workgroup_Discord_Channels_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_channels_read_failed = /** @type {((inputs?: Workgroup_Discord_Channels_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_Channels_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_discord_channels_read_failed(inputs)
	return __zh.workgroup_discord_channels_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Discord connection status." |
*
* @param {Workgroup_Discord_Status_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_status_read_failed = /** @type {((inputs?: Workgroup_Discord_Status_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_Status_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_discord_status_read_failed(inputs)
	return __zh.workgroup_discord_status_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "Slack is connected. You can continue selecting workgroups." |
*
* @param {Workgroup_Slack_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_ready = /** @type {((inputs?: Workgroup_Slack_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_slack_ready(inputs)
	return __zh.workgroup_slack_ready(inputs)
});
/**
* | output |
* | --- |
* | "Connect a Slack workspace in Slack settings before choosing workgroups." |
*
* @param {Workgroup_Slack_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_connect_first = /** @type {((inputs?: Workgroup_Slack_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_slack_connect_first(inputs)
	return __zh.workgroup_slack_connect_first(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Slack channels." |
*
* @param {Workgroup_Slack_Channels_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_channels_read_failed = /** @type {((inputs?: Workgroup_Slack_Channels_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_Channels_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_slack_channels_read_failed(inputs)
	return __zh.workgroup_slack_channels_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Slack connection status." |
*
* @param {Workgroup_Slack_Status_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_status_read_failed = /** @type {((inputs?: Workgroup_Slack_Status_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_Status_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_slack_status_read_failed(inputs)
	return __zh.workgroup_slack_status_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "{count} Telegram communities bound. You can continue selecting workgroups." |
*
* @param {Workgroup_Telegram_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_telegram_ready = /** @type {((inputs: Workgroup_Telegram_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Telegram_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_telegram_ready(inputs)
	return __zh.workgroup_telegram_ready(inputs)
});
/**
* | output |
* | --- |
* | "Add a Telegram community in Telegram settings before choosing workgroups." |
*
* @param {Workgroup_Telegram_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_telegram_connect_first = /** @type {((inputs?: Workgroup_Telegram_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Telegram_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_telegram_connect_first(inputs)
	return __zh.workgroup_telegram_connect_first(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Telegram communities." |
*
* @param {Workgroup_Telegram_Channels_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_telegram_channels_read_failed = /** @type {((inputs?: Workgroup_Telegram_Channels_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Telegram_Channels_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_telegram_channels_read_failed(inputs)
	return __zh.workgroup_telegram_channels_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "{count} Feishu chats synced. You can continue selecting workgroups." |
*
* @param {Workgroup_Feishu_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_feishu_ready = /** @type {((inputs: Workgroup_Feishu_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Feishu_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_feishu_ready(inputs)
	return __zh.workgroup_feishu_ready(inputs)
});
/**
* | output |
* | --- |
* | "Finish Feishu workgroup access before choosing workgroups." |
*
* @param {Workgroup_Feishu_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_feishu_connect_first = /** @type {((inputs?: Workgroup_Feishu_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Feishu_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_feishu_connect_first(inputs)
	return __zh.workgroup_feishu_connect_first(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load Feishu channels." |
*
* @param {Workgroup_Feishu_Channels_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_feishu_channels_read_failed = /** @type {((inputs?: Workgroup_Feishu_Channels_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Feishu_Channels_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.workgroup_feishu_channels_read_failed(inputs)
	return __zh.workgroup_feishu_channels_read_failed(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load session: {status}" |
*
* @param {Knowledge_Session_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_session_load_failed = /** @type {((inputs: Knowledge_Session_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Session_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.knowledge_session_load_failed(inputs)
	return __zh.knowledge_session_load_failed(inputs)
});
/**
* | output |
* | --- |
* | "Free" |
*
* @param {Billing_Plan_Name_FreeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_free = /** @type {((inputs?: Billing_Plan_Name_FreeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_FreeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_plan_name_free(inputs)
	return __zh.billing_plan_name_free(inputs)
});
/**
* | output |
* | --- |
* | "Basic" |
*
* @param {Billing_Plan_Name_BasicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_basic = /** @type {((inputs?: Billing_Plan_Name_BasicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_BasicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_plan_name_basic(inputs)
	return __zh.billing_plan_name_basic(inputs)
});
/**
* | output |
* | --- |
* | "Pro" |
*
* @param {Billing_Plan_Name_ProInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_pro = /** @type {((inputs?: Billing_Plan_Name_ProInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_ProInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_plan_name_pro(inputs)
	return __zh.billing_plan_name_pro(inputs)
});
/**
* | output |
* | --- |
* | "Base plan" |
*
* @param {Billing_Export_Base_Plan_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_label = /** @type {((inputs?: Billing_Export_Base_Plan_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_base_plan_label(inputs)
	return __zh.billing_export_base_plan_label(inputs)
});
/**
* | output |
* | --- |
* | "{planName} monthly fee" |
*
* @param {Billing_Export_Base_Plan_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_description = /** @type {((inputs: Billing_Export_Base_Plan_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_base_plan_description(inputs)
	return __zh.billing_export_base_plan_description(inputs)
});
/**
* | output |
* | --- |
* | "1 plan" |
*
* @param {Billing_Export_Base_Plan_QuantityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_quantity = /** @type {((inputs?: Billing_Export_Base_Plan_QuantityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_QuantityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_base_plan_quantity(inputs)
	return __zh.billing_export_base_plan_quantity(inputs)
});
/**
* | output |
* | --- |
* | "Included actions" |
*
* @param {Billing_Export_Included_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_included_actions_label = /** @type {((inputs?: Billing_Export_Included_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Included_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_included_actions_label(inputs)
	return __zh.billing_export_included_actions_label(inputs)
});
/**
* | output |
* | --- |
* | "Quota included in the current billing period" |
*
* @param {Billing_Export_Included_Actions_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_included_actions_desc = /** @type {((inputs?: Billing_Export_Included_Actions_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Included_Actions_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_included_actions_desc(inputs)
	return __zh.billing_export_included_actions_desc(inputs)
});
/**
* | output |
* | --- |
* | "Used actions" |
*
* @param {Billing_Export_Used_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_used_actions_label = /** @type {((inputs?: Billing_Export_Used_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Used_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_used_actions_label(inputs)
	return __zh.billing_export_used_actions_label(inputs)
});
/**
* | output |
* | --- |
* | "Exceeded the included quota" |
*
* @param {Billing_Export_Used_Actions_Desc_OverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_used_actions_desc_over = /** @type {((inputs?: Billing_Export_Used_Actions_Desc_OverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Used_Actions_Desc_OverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_used_actions_desc_over(inputs)
	return __zh.billing_export_used_actions_desc_over(inputs)
});
/**
* | output |
* | --- |
* | "Still within the included quota" |
*
* @param {Billing_Export_Used_Actions_Desc_IncludedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_used_actions_desc_included = /** @type {((inputs?: Billing_Export_Used_Actions_Desc_IncludedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Used_Actions_Desc_IncludedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_used_actions_desc_included(inputs)
	return __zh.billing_export_used_actions_desc_included(inputs)
});
/**
* | output |
* | --- |
* | "Extra admin seats" |
*
* @param {Billing_Export_Extra_Admins_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_admins_label = /** @type {((inputs?: Billing_Export_Extra_Admins_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Admins_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_extra_admins_label(inputs)
	return __zh.billing_export_extra_admins_label(inputs)
});
/**
* | output |
* | --- |
* | "Admins beyond the included quota" |
*
* @param {Billing_Export_Extra_Admins_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_admins_desc = /** @type {((inputs?: Billing_Export_Extra_Admins_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Admins_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_extra_admins_desc(inputs)
	return __zh.billing_export_extra_admins_desc(inputs)
});
/**
* | output |
* | --- |
* | "Extra platform connections" |
*
* @param {Billing_Export_Extra_Platforms_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_platforms_label = /** @type {((inputs?: Billing_Export_Extra_Platforms_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Platforms_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_extra_platforms_label(inputs)
	return __zh.billing_export_extra_platforms_label(inputs)
});
/**
* | output |
* | --- |
* | "Platforms beyond the included quota" |
*
* @param {Billing_Export_Extra_Platforms_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_platforms_desc = /** @type {((inputs?: Billing_Export_Extra_Platforms_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Platforms_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_extra_platforms_desc(inputs)
	return __zh.billing_export_extra_platforms_desc(inputs)
});
/**
* | output |
* | --- |
* | "Overage actions" |
*
* @param {Billing_Export_Overage_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_overage_actions_label = /** @type {((inputs?: Billing_Export_Overage_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Overage_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_overage_actions_label(inputs)
	return __zh.billing_export_overage_actions_label(inputs)
});
/**
* | output |
* | --- |
* | "Billed under the {mode} policy" |
*
* @param {Billing_Export_Overage_Actions_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_overage_actions_desc = /** @type {((inputs: Billing_Export_Overage_Actions_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Overage_Actions_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_overage_actions_desc(inputs)
	return __zh.billing_export_overage_actions_desc(inputs)
});
/**
* | output |
* | --- |
* | "Blocked actions" |
*
* @param {Billing_Export_Blocked_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_blocked_actions_label = /** @type {((inputs?: Billing_Export_Blocked_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Blocked_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_blocked_actions_label(inputs)
	return __zh.billing_export_blocked_actions_label(inputs)
});
/**
* | output |
* | --- |
* | "Blocked by the stop-service policy and not billed" |
*
* @param {Billing_Export_Blocked_Actions_Desc_StopInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_blocked_actions_desc_stop = /** @type {((inputs?: Billing_Export_Blocked_Actions_Desc_StopInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Blocked_Actions_Desc_StopInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_blocked_actions_desc_stop(inputs)
	return __zh.billing_export_blocked_actions_desc_stop(inputs)
});
/**
* | output |
* | --- |
* | "Blocked by the quota policy in the current period" |
*
* @param {Billing_Export_Blocked_Actions_Desc_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_blocked_actions_desc_cap = /** @type {((inputs?: Billing_Export_Blocked_Actions_Desc_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Blocked_Actions_Desc_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_blocked_actions_desc_cap(inputs)
	return __zh.billing_export_blocked_actions_desc_cap(inputs)
});
/**
* | output |
* | --- |
* | "{count} actions" |
*
* @param {Billing_Export_Quantity_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_actions = /** @type {((inputs: Billing_Export_Quantity_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_quantity_actions(inputs)
	return __zh.billing_export_quantity_actions(inputs)
});
/**
* | output |
* | --- |
* | "{count} seat(s)" |
*
* @param {Billing_Export_Quantity_AdminsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_admins = /** @type {((inputs: Billing_Export_Quantity_AdminsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_AdminsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_quantity_admins(inputs)
	return __zh.billing_export_quantity_admins(inputs)
});
/**
* | output |
* | --- |
* | "{count} platform(s)" |
*
* @param {Billing_Export_Quantity_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_platforms = /** @type {((inputs: Billing_Export_Quantity_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_quantity_platforms(inputs)
	return __zh.billing_export_quantity_platforms(inputs)
});
/**
* | output |
* | --- |
* | "Billing account ID" |
*
* @param {Billing_Export_Csv_Account_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_account_id = /** @type {((inputs?: Billing_Export_Csv_Account_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Account_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_account_id(inputs)
	return __zh.billing_export_csv_account_id(inputs)
});
/**
* | output |
* | --- |
* | "Period key" |
*
* @param {Billing_Export_Csv_Period_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_period_key = /** @type {((inputs?: Billing_Export_Csv_Period_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Period_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_period_key(inputs)
	return __zh.billing_export_csv_period_key(inputs)
});
/**
* | output |
* | --- |
* | "Period start" |
*
* @param {Billing_Export_Csv_Period_StartInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_period_start = /** @type {((inputs?: Billing_Export_Csv_Period_StartInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Period_StartInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_period_start(inputs)
	return __zh.billing_export_csv_period_start(inputs)
});
/**
* | output |
* | --- |
* | "Period end" |
*
* @param {Billing_Export_Csv_Period_EndInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_period_end = /** @type {((inputs?: Billing_Export_Csv_Period_EndInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Period_EndInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_period_end(inputs)
	return __zh.billing_export_csv_period_end(inputs)
});
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Billing_Export_Csv_PlanInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_plan = /** @type {((inputs?: Billing_Export_Csv_PlanInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_PlanInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_plan(inputs)
	return __zh.billing_export_csv_plan(inputs)
});
/**
* | output |
* | --- |
* | "Overage policy" |
*
* @param {Billing_Export_Csv_Overage_PolicyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_overage_policy = /** @type {((inputs?: Billing_Export_Csv_Overage_PolicyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Overage_PolicyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_overage_policy(inputs)
	return __zh.billing_export_csv_overage_policy(inputs)
});
/**
* | output |
* | --- |
* | "Projected bill (USD)" |
*
* @param {Billing_Export_Csv_Projected_TotalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_projected_total = /** @type {((inputs?: Billing_Export_Csv_Projected_TotalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Projected_TotalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_projected_total(inputs)
	return __zh.billing_export_csv_projected_total(inputs)
});
/**
* | output |
* | --- |
* | "Category" |
*
* @param {Billing_Export_Csv_CategoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_category = /** @type {((inputs?: Billing_Export_Csv_CategoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_CategoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_category(inputs)
	return __zh.billing_export_csv_category(inputs)
});
/**
* | output |
* | --- |
* | "Description" |
*
* @param {Billing_Export_Csv_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_description = /** @type {((inputs?: Billing_Export_Csv_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_description(inputs)
	return __zh.billing_export_csv_description(inputs)
});
/**
* | output |
* | --- |
* | "Charge item" |
*
* @param {Billing_Export_Csv_ChargeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_charge = /** @type {((inputs?: Billing_Export_Csv_ChargeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_ChargeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_charge(inputs)
	return __zh.billing_export_csv_charge(inputs)
});
/**
* | output |
* | --- |
* | "Info item" |
*
* @param {Billing_Export_Csv_InfoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_info = /** @type {((inputs?: Billing_Export_Csv_InfoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_InfoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_info(inputs)
	return __zh.billing_export_csv_info(inputs)
});
/**
* | output |
* | --- |
* | "Estimated settlement total" |
*
* @param {Billing_Export_Csv_Estimated_TotalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_estimated_total = /** @type {((inputs?: Billing_Export_Csv_Estimated_TotalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Estimated_TotalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.billing_export_csv_estimated_total(inputs)
	return __zh.billing_export_csv_estimated_total(inputs)
});
/**
* | output |
* | --- |
* | "Community Profile" |
*
* @param {Cp_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_page_title = /** @type {((inputs?: Cp_Page_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Page_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_page_title(inputs)
	return __zh.cp_page_title(inputs)
});
/**
* | output |
* | --- |
* | "Community" |
*
* @param {Cp_Filter_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_filter_community = /** @type {((inputs?: Cp_Filter_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Filter_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_filter_community(inputs)
	return __zh.cp_filter_community(inputs)
});
/**
* | output |
* | --- |
* | "Time" |
*
* @param {Cp_Filter_TimeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_filter_time = /** @type {((inputs?: Cp_Filter_TimeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Filter_TimeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_filter_time(inputs)
	return __zh.cp_filter_time(inputs)
});
/**
* | output |
* | --- |
* | "All communities ({count})" |
*
* @param {Cp_All_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_all_communities = /** @type {((inputs: Cp_All_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_All_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_all_communities(inputs)
	return __zh.cp_all_communities(inputs)
});
/**
* | output |
* | --- |
* | "Last 7 days" |
*
* @param {Cp_Time_7dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_7d = /** @type {((inputs?: Cp_Time_7dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_7dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_time_7d(inputs)
	return __zh.cp_time_7d(inputs)
});
/**
* | output |
* | --- |
* | "Last 14 days" |
*
* @param {Cp_Time_14dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_14d = /** @type {((inputs?: Cp_Time_14dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_14dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_time_14d(inputs)
	return __zh.cp_time_14d(inputs)
});
/**
* | output |
* | --- |
* | "Last 30 days" |
*
* @param {Cp_Time_30dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_30d = /** @type {((inputs?: Cp_Time_30dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_30dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_time_30d(inputs)
	return __zh.cp_time_30d(inputs)
});
/**
* | output |
* | --- |
* | "Key Metrics" |
*
* @param {Cp_Section_MetricsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_section_metrics = /** @type {((inputs?: Cp_Section_MetricsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Section_MetricsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_section_metrics(inputs)
	return __zh.cp_section_metrics(inputs)
});
/**
* | output |
* | --- |
* | "Total Users" |
*
* @param {Cp_Total_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_total_users = /** @type {((inputs?: Cp_Total_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Total_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_total_users(inputs)
	return __zh.cp_total_users(inputs)
});
/**
* | output |
* | --- |
* | "Total community size" |
*
* @param {Cp_Total_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_total_users_helper = /** @type {((inputs?: Cp_Total_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Total_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_total_users_helper(inputs)
	return __zh.cp_total_users_helper(inputs)
});
/**
* | output |
* | --- |
* | "New Users" |
*
* @param {Cp_New_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_new_users = /** @type {((inputs?: Cp_New_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_New_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_new_users(inputs)
	return __zh.cp_new_users(inputs)
});
/**
* | output |
* | --- |
* | "Accumulated in {range}" |
*
* @param {Cp_New_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_new_users_helper = /** @type {((inputs: Cp_New_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_New_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_new_users_helper(inputs)
	return __zh.cp_new_users_helper(inputs)
});
/**
* | output |
* | --- |
* | "Active Users" |
*
* @param {Cp_Active_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_active_users = /** @type {((inputs?: Cp_Active_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Active_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_active_users(inputs)
	return __zh.cp_active_users(inputs)
});
/**
* | output |
* | --- |
* | "Active in {range}" |
*
* @param {Cp_Active_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_active_users_helper = /** @type {((inputs: Cp_Active_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Active_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_active_users_helper(inputs)
	return __zh.cp_active_users_helper(inputs)
});
/**
* | output |
* | --- |
* | "Trend Insights" |
*
* @param {Cp_Section_TrendsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_section_trends = /** @type {((inputs?: Cp_Section_TrendsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Section_TrendsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_section_trends(inputs)
	return __zh.cp_section_trends(inputs)
});
/**
* | output |
* | --- |
* | "Total Users Trend" |
*
* @param {Cp_Chart_Total_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_chart_total_users = /** @type {((inputs?: Cp_Chart_Total_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Chart_Total_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_chart_total_users(inputs)
	return __zh.cp_chart_total_users(inputs)
});
/**
* | output |
* | --- |
* | "New Users Trend" |
*
* @param {Cp_Chart_New_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_chart_new_users = /** @type {((inputs?: Cp_Chart_New_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Chart_New_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_chart_new_users(inputs)
	return __zh.cp_chart_new_users(inputs)
});
/**
* | output |
* | --- |
* | "Active Users Trend" |
*
* @param {Cp_Chart_Active_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_chart_active_users = /** @type {((inputs?: Cp_Chart_Active_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Chart_Active_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_chart_active_users(inputs)
	return __zh.cp_chart_active_users(inputs)
});
/**
* | output |
* | --- |
* | "No data available for the selected time range" |
*
* @param {Cp_No_Chart_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_no_chart_data = /** @type {((inputs?: Cp_No_Chart_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_No_Chart_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cp_no_chart_data(inputs)
	return __zh.cp_no_chart_data(inputs)
});
/**
* | output |
* | --- |
* | "User List" |
*
* @param {Ul_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_page_title = /** @type {((inputs?: Ul_Page_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Page_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_page_title(inputs)
	return __zh.ul_page_title(inputs)
});
/**
* | output |
* | --- |
* | "N/A" |
*
* @param {Ul_No_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_data = /** @type {((inputs?: Ul_No_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_no_data(inputs)
	return __zh.ul_no_data(inputs)
});
/**
* | output |
* | --- |
* | "All Platforms" |
*
* @param {Ul_Platform_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_platform_all = /** @type {((inputs?: Ul_Platform_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Platform_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_platform_all(inputs)
	return __zh.ul_platform_all(inputs)
});
/**
* | output |
* | --- |
* | "All Activity Periods" |
*
* @param {Ul_Active_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_all = /** @type {((inputs?: Ul_Active_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_active_all(inputs)
	return __zh.ul_active_all(inputs)
});
/**
* | output |
* | --- |
* | "Active in 7 days" |
*
* @param {Ul_Active_7dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_7d = /** @type {((inputs?: Ul_Active_7dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_7dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_active_7d(inputs)
	return __zh.ul_active_7d(inputs)
});
/**
* | output |
* | --- |
* | "Active in 30 days" |
*
* @param {Ul_Active_30dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_30d = /** @type {((inputs?: Ul_Active_30dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_30dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_active_30d(inputs)
	return __zh.ul_active_30d(inputs)
});
/**
* | output |
* | --- |
* | "Active in 90 days" |
*
* @param {Ul_Active_90dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_90d = /** @type {((inputs?: Ul_Active_90dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_90dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_active_90d(inputs)
	return __zh.ul_active_90d(inputs)
});
/**
* | output |
* | --- |
* | "Last Active" |
*
* @param {Ul_Sort_Last_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_last_active = /** @type {((inputs?: Ul_Sort_Last_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Last_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_last_active(inputs)
	return __zh.ul_sort_last_active(inputs)
});
/**
* | output |
* | --- |
* | "Total Messages" |
*
* @param {Ul_Sort_Total_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_total_messages = /** @type {((inputs?: Ul_Sort_Total_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Total_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_total_messages(inputs)
	return __zh.ul_sort_total_messages(inputs)
});
/**
* | output |
* | --- |
* | "Last Summary" |
*
* @param {Ul_Sort_Last_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_last_summary = /** @type {((inputs?: Ul_Sort_Last_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Last_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_last_summary(inputs)
	return __zh.ul_sort_last_summary(inputs)
});
/**
* | output |
* | --- |
* | "Last Updated" |
*
* @param {Ul_Sort_Last_UpdatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_last_updated = /** @type {((inputs?: Ul_Sort_Last_UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Last_UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_last_updated(inputs)
	return __zh.ul_sort_last_updated(inputs)
});
/**
* | output |
* | --- |
* | "Created At" |
*
* @param {Ul_Sort_Created_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_created_at = /** @type {((inputs?: Ul_Sort_Created_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Created_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_created_at(inputs)
	return __zh.ul_sort_created_at(inputs)
});
/**
* | output |
* | --- |
* | "Username" |
*
* @param {Ul_Sort_UsernameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_username = /** @type {((inputs?: Ul_Sort_UsernameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_UsernameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_username(inputs)
	return __zh.ul_sort_username(inputs)
});
/**
* | output |
* | --- |
* | "Descending" |
*
* @param {Ul_Order_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_order_desc = /** @type {((inputs?: Ul_Order_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Order_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_order_desc(inputs)
	return __zh.ul_order_desc(inputs)
});
/**
* | output |
* | --- |
* | "Ascending" |
*
* @param {Ul_Order_AscInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_order_asc = /** @type {((inputs?: Ul_Order_AscInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Order_AscInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_order_asc(inputs)
	return __zh.ul_order_asc(inputs)
});
/**
* | output |
* | --- |
* | "Search user_id / username / profile" |
*
* @param {Ul_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_search_placeholder = /** @type {((inputs?: Ul_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_search_placeholder(inputs)
	return __zh.ul_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Clear Filters" |
*
* @param {Ul_Clear_FiltersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_clear_filters = /** @type {((inputs?: Ul_Clear_FiltersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Clear_FiltersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_clear_filters(inputs)
	return __zh.ul_clear_filters(inputs)
});
/**
* | output |
* | --- |
* | "{count} users total" |
*
* @param {Ul_Total_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_total_users = /** @type {((inputs: Ul_Total_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Total_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_total_users(inputs)
	return __zh.ul_total_users(inputs)
});
/**
* | output |
* | --- |
* | "Showing {start}-{end}" |
*
* @param {Ul_Showing_RangeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_showing_range = /** @type {((inputs: Ul_Showing_RangeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Showing_RangeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_showing_range(inputs)
	return __zh.ul_showing_range(inputs)
});
/**
* | output |
* | --- |
* | "Updating" |
*
* @param {Ul_UpdatingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_updating = /** @type {((inputs?: Ul_UpdatingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_UpdatingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_updating(inputs)
	return __zh.ul_updating(inputs)
});
/**
* | output |
* | --- |
* | "Please select a company to view the user list." |
*
* @param {Ul_Pick_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_pick_company_first = /** @type {((inputs?: Ul_Pick_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Pick_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_pick_company_first(inputs)
	return __zh.ul_pick_company_first(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load user list" |
*
* @param {Ul_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_load_error = /** @type {((inputs?: Ul_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_load_error(inputs)
	return __zh.ul_load_error(inputs)
});
/**
* | output |
* | --- |
* | "User" |
*
* @param {Ul_Col_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_user = /** @type {((inputs?: Ul_Col_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_user(inputs)
	return __zh.ul_col_user(inputs)
});
/**
* | output |
* | --- |
* | "Platform" |
*
* @param {Ul_Col_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_platform = /** @type {((inputs?: Ul_Col_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_platform(inputs)
	return __zh.ul_col_platform(inputs)
});
/**
* | output |
* | --- |
* | "Messages" |
*
* @param {Ul_Col_Total_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_total_messages = /** @type {((inputs?: Ul_Col_Total_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_Total_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_total_messages(inputs)
	return __zh.ul_col_total_messages(inputs)
});
/**
* | output |
* | --- |
* | "First Interaction" |
*
* @param {Ul_Col_First_InteractionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_first_interaction = /** @type {((inputs?: Ul_Col_First_InteractionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_First_InteractionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_first_interaction(inputs)
	return __zh.ul_col_first_interaction(inputs)
});
/**
* | output |
* | --- |
* | "Last Active" |
*
* @param {Ul_Col_Last_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_last_active = /** @type {((inputs?: Ul_Col_Last_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_Last_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_last_active(inputs)
	return __zh.ul_col_last_active(inputs)
});
/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Ul_Col_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_profile = /** @type {((inputs?: Ul_Col_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_profile(inputs)
	return __zh.ul_col_profile(inputs)
});
/**
* | output |
* | --- |
* | "Tags" |
*
* @param {Ul_Col_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_tags = /** @type {((inputs?: Ul_Col_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_col_tags(inputs)
	return __zh.ul_col_tags(inputs)
});
/**
* | output |
* | --- |
* | "All Tags" |
*
* @param {Ul_All_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_all_tags = /** @type {((inputs?: Ul_All_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_All_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_all_tags(inputs)
	return __zh.ul_all_tags(inputs)
});
/**
* | output |
* | --- |
* | "No tags" |
*
* @param {Ul_No_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_tags = /** @type {((inputs?: Ul_No_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_no_tags(inputs)
	return __zh.ul_no_tags(inputs)
});
/**
* | output |
* | --- |
* | "Min messages" |
*
* @param {Ul_Min_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_min_messages = /** @type {((inputs?: Ul_Min_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Min_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_min_messages(inputs)
	return __zh.ul_min_messages(inputs)
});
/**
* | output |
* | --- |
* | "Sort by" |
*
* @param {Ul_Sort_FieldInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_field = /** @type {((inputs?: Ul_Sort_FieldInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_FieldInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_field(inputs)
	return __zh.ul_sort_field(inputs)
});
/**
* | output |
* | --- |
* | "Order" |
*
* @param {Ul_Sort_OrderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_order = /** @type {((inputs?: Ul_Sort_OrderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_OrderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_sort_order(inputs)
	return __zh.ul_sort_order(inputs)
});
/**
* | output |
* | --- |
* | "No profile yet" |
*
* @param {Ul_No_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_profile = /** @type {((inputs?: Ul_No_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_no_profile(inputs)
	return __zh.ul_no_profile(inputs)
});
/**
* | output |
* | --- |
* | "No users found with current filters." |
*
* @param {Ul_Empty_ResultsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_empty_results = /** @type {((inputs?: Ul_Empty_ResultsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Empty_ResultsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_empty_results(inputs)
	return __zh.ul_empty_results(inputs)
});
/**
* | output |
* | --- |
* | "User Profile" |
*
* @param {Ul_Detail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_title = /** @type {((inputs?: Ul_Detail_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_title(inputs)
	return __zh.ul_detail_title(inputs)
});
/**
* | output |
* | --- |
* | "Close detail" |
*
* @param {Ul_Close_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_close_detail = /** @type {((inputs?: Ul_Close_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Close_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_close_detail(inputs)
	return __zh.ul_close_detail(inputs)
});
/**
* | output |
* | --- |
* | "First Interaction" |
*
* @param {Ul_Detail_First_InteractionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_first_interaction = /** @type {((inputs?: Ul_Detail_First_InteractionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_First_InteractionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_first_interaction(inputs)
	return __zh.ul_detail_first_interaction(inputs)
});
/**
* | output |
* | --- |
* | "First interaction date recorded by the system" |
*
* @param {Ul_Detail_First_Interaction_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_first_interaction_helper = /** @type {((inputs?: Ul_Detail_First_Interaction_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_First_Interaction_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_first_interaction_helper(inputs)
	return __zh.ul_detail_first_interaction_helper(inputs)
});
/**
* | output |
* | --- |
* | "Last Active" |
*
* @param {Ul_Detail_Last_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_last_active = /** @type {((inputs?: Ul_Detail_Last_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Last_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_last_active(inputs)
	return __zh.ul_detail_last_active(inputs)
});
/**
* | output |
* | --- |
* | "Last message date" |
*
* @param {Ul_Detail_Last_Active_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_last_active_helper = /** @type {((inputs?: Ul_Detail_Last_Active_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Last_Active_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_last_active_helper(inputs)
	return __zh.ul_detail_last_active_helper(inputs)
});
/**
* | output |
* | --- |
* | "User Profile" |
*
* @param {Ul_Detail_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile = /** @type {((inputs?: Ul_Detail_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_profile(inputs)
	return __zh.ul_detail_profile(inputs)
});
/**
* | output |
* | --- |
* | "Expand" |
*
* @param {Ul_Detail_Profile_ExpandInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile_expand = /** @type {((inputs?: Ul_Detail_Profile_ExpandInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Profile_ExpandInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_profile_expand(inputs)
	return __zh.ul_detail_profile_expand(inputs)
});
/**
* | output |
* | --- |
* | "Collapse" |
*
* @param {Ul_Detail_Profile_CollapseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile_collapse = /** @type {((inputs?: Ul_Detail_Profile_CollapseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Profile_CollapseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_profile_collapse(inputs)
	return __zh.ul_detail_profile_collapse(inputs)
});
/**
* | output |
* | --- |
* | "Tag Details" |
*
* @param {Ul_Detail_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_tags = /** @type {((inputs?: Ul_Detail_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_tags(inputs)
	return __zh.ul_detail_tags(inputs)
});
/**
* | output |
* | --- |
* | "No reason provided" |
*
* @param {Ul_Detail_No_ReasonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_no_reason = /** @type {((inputs?: Ul_Detail_No_ReasonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_No_ReasonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_no_reason(inputs)
	return __zh.ul_detail_no_reason(inputs)
});
/**
* | output |
* | --- |
* | "30-Day Message Trend" |
*
* @param {Ul_Trend_Messages_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_messages_title = /** @type {((inputs?: Ul_Trend_Messages_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Messages_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_trend_messages_title(inputs)
	return __zh.ul_trend_messages_title(inputs)
});
/**
* | output |
* | --- |
* | "Generated from m30_message_counts" |
*
* @param {Ul_Trend_Messages_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_messages_desc = /** @type {((inputs?: Ul_Trend_Messages_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Messages_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_trend_messages_desc(inputs)
	return __zh.ul_trend_messages_desc(inputs)
});
/**
* | output |
* | --- |
* | "30-Day Activity Score" |
*
* @param {Ul_Trend_Active_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_active_title = /** @type {((inputs?: Ul_Trend_Active_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Active_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_trend_active_title(inputs)
	return __zh.ul_trend_active_title(inputs)
});
/**
* | output |
* | --- |
* | "Generated from active_score" |
*
* @param {Ul_Trend_Active_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_active_desc = /** @type {((inputs?: Ul_Trend_Active_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Active_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_trend_active_desc(inputs)
	return __zh.ul_trend_active_desc(inputs)
});
/**
* | output |
* | --- |
* | "Chat Records" |
*
* @param {Ul_Chat_RecordsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_chat_records = /** @type {((inputs?: Ul_Chat_RecordsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Chat_RecordsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_chat_records(inputs)
	return __zh.ul_chat_records(inputs)
});
/**
* | output |
* | --- |
* | "Loading messages" |
*
* @param {Ul_Loading_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_messages = /** @type {((inputs?: Ul_Loading_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_loading_messages(inputs)
	return __zh.ul_loading_messages(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load messages" |
*
* @param {Ul_Load_Messages_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_load_messages_error = /** @type {((inputs?: Ul_Load_Messages_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Load_Messages_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_load_messages_error(inputs)
	return __zh.ul_load_messages_error(inputs)
});
/**
* | output |
* | --- |
* | "No chat records" |
*
* @param {Ul_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_messages = /** @type {((inputs?: Ul_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_no_messages(inputs)
	return __zh.ul_no_messages(inputs)
});
/**
* | output |
* | --- |
* | "Empty message content" |
*
* @param {Ul_Empty_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_empty_message = /** @type {((inputs?: Ul_Empty_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Empty_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_empty_message(inputs)
	return __zh.ul_empty_message(inputs)
});
/**
* | output |
* | --- |
* | "Channel {channelId}" |
*
* @param {Ul_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_channel = /** @type {((inputs: Ul_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_channel(inputs)
	return __zh.ul_channel(inputs)
});
/**
* | output |
* | --- |
* | "{count} messages total" |
*
* @param {Ul_Total_Messages_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_total_messages_count = /** @type {((inputs: Ul_Total_Messages_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Total_Messages_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_total_messages_count(inputs)
	return __zh.ul_total_messages_count(inputs)
});
/**
* | output |
* | --- |
* | "Loading user details" |
*
* @param {Ul_Loading_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_detail = /** @type {((inputs?: Ul_Loading_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_loading_detail(inputs)
	return __zh.ul_loading_detail(inputs)
});
/**
* | output |
* | --- |
* | "Please wait, loading user profile and messages." |
*
* @param {Ul_Loading_Detail_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_detail_desc = /** @type {((inputs?: Ul_Loading_Detail_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_Detail_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_loading_detail_desc(inputs)
	return __zh.ul_loading_detail_desc(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load user details" |
*
* @param {Ul_Detail_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_load_error = /** @type {((inputs?: Ul_Detail_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_detail_load_error(inputs)
	return __zh.ul_detail_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Please try again later" |
*
* @param {Ul_Retry_LaterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_retry_later = /** @type {((inputs?: Ul_Retry_LaterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Retry_LaterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_retry_later(inputs)
	return __zh.ul_retry_later(inputs)
});
/**
* | output |
* | --- |
* | "Manage Tags" |
*
* @param {Ul_Tag_Manage_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_button = /** @type {((inputs?: Ul_Tag_Manage_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_manage_button(inputs)
	return __zh.ul_tag_manage_button(inputs)
});
/**
* | output |
* | --- |
* | "Tag Management" |
*
* @param {Ul_Tag_Manage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_title = /** @type {((inputs?: Ul_Tag_Manage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_manage_title(inputs)
	return __zh.ul_tag_manage_title(inputs)
});
/**
* | output |
* | --- |
* | "Review existing tags and create or disable tag definitions for the current company." |
*
* @param {Ul_Tag_Manage_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_desc = /** @type {((inputs?: Ul_Tag_Manage_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_manage_desc(inputs)
	return __zh.ul_tag_manage_desc(inputs)
});
/**
* | output |
* | --- |
* | "Existing Tags" |
*
* @param {Ul_Tag_ExistingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_existing = /** @type {((inputs?: Ul_Tag_ExistingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_ExistingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_existing(inputs)
	return __zh.ul_tag_existing(inputs)
});
/**
* | output |
* | --- |
* | "{count} tags" |
*
* @param {Ul_Tag_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_count = /** @type {((inputs: Ul_Tag_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_count(inputs)
	return __zh.ul_tag_count(inputs)
});
/**
* | output |
* | --- |
* | "Loading tags" |
*
* @param {Ul_Tag_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_loading = /** @type {((inputs?: Ul_Tag_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_loading(inputs)
	return __zh.ul_tag_loading(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load tags" |
*
* @param {Ul_Tag_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_load_error = /** @type {((inputs?: Ul_Tag_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_load_error(inputs)
	return __zh.ul_tag_load_error(inputs)
});
/**
* | output |
* | --- |
* | "No tags yet" |
*
* @param {Ul_Tag_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_empty = /** @type {((inputs?: Ul_Tag_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_empty(inputs)
	return __zh.ul_tag_empty(inputs)
});
/**
* | output |
* | --- |
* | "Active" |
*
* @param {Ul_Tag_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_status_active = /** @type {((inputs?: Ul_Tag_Status_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Status_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_status_active(inputs)
	return __zh.ul_tag_status_active(inputs)
});
/**
* | output |
* | --- |
* | "Inactive" |
*
* @param {Ul_Tag_Status_InactiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_status_inactive = /** @type {((inputs?: Ul_Tag_Status_InactiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Status_InactiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_status_inactive(inputs)
	return __zh.ul_tag_status_inactive(inputs)
});
/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Ul_Tag_Toggle_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_toggle_label = /** @type {((inputs?: Ul_Tag_Toggle_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Toggle_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_toggle_label(inputs)
	return __zh.ul_tag_toggle_label(inputs)
});
/**
* | output |
* | --- |
* | "No description" |
*
* @param {Ul_Tag_No_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_no_description = /** @type {((inputs?: Ul_Tag_No_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_No_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_no_description(inputs)
	return __zh.ul_tag_no_description(inputs)
});
/**
* | output |
* | --- |
* | "Create Tag" |
*
* @param {Ul_Tag_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_title = /** @type {((inputs?: Ul_Tag_Create_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_title(inputs)
	return __zh.ul_tag_create_title(inputs)
});
/**
* | output |
* | --- |
* | "New tags are synced to the filter list immediately and enabled by default." |
*
* @param {Ul_Tag_Create_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_desc = /** @type {((inputs?: Ul_Tag_Create_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_desc(inputs)
	return __zh.ul_tag_create_desc(inputs)
});
/**
* | output |
* | --- |
* | "Tag Name" |
*
* @param {Ul_Tag_Form_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name = /** @type {((inputs?: Ul_Tag_Form_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_form_name(inputs)
	return __zh.ul_tag_form_name(inputs)
});
/**
* | output |
* | --- |
* | "e.g. High-intent lead" |
*
* @param {Ul_Tag_Form_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name_placeholder = /** @type {((inputs?: Ul_Tag_Form_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_form_name_placeholder(inputs)
	return __zh.ul_tag_form_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Please enter a tag name" |
*
* @param {Ul_Tag_Form_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name_required = /** @type {((inputs?: Ul_Tag_Form_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_form_name_required(inputs)
	return __zh.ul_tag_form_name_required(inputs)
});
/**
* | output |
* | --- |
* | "Description" |
*
* @param {Ul_Tag_Form_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_description = /** @type {((inputs?: Ul_Tag_Form_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_form_description(inputs)
	return __zh.ul_tag_form_description(inputs)
});
/**
* | output |
* | --- |
* | "Describe the rule or operational use for this tag" |
*
* @param {Ul_Tag_Form_Description_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_description_placeholder = /** @type {((inputs?: Ul_Tag_Form_Description_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Description_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_form_description_placeholder(inputs)
	return __zh.ul_tag_form_description_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Create Tag" |
*
* @param {Ul_Tag_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_button = /** @type {((inputs?: Ul_Tag_Create_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_button(inputs)
	return __zh.ul_tag_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Creating..." |
*
* @param {Ul_Tag_Create_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_loading = /** @type {((inputs?: Ul_Tag_Create_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_loading(inputs)
	return __zh.ul_tag_create_loading(inputs)
});
/**
* | output |
* | --- |
* | "Tag created" |
*
* @param {Ul_Tag_Create_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_success = /** @type {((inputs?: Ul_Tag_Create_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_success(inputs)
	return __zh.ul_tag_create_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create tag" |
*
* @param {Ul_Tag_Create_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_error = /** @type {((inputs?: Ul_Tag_Create_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_create_error(inputs)
	return __zh.ul_tag_create_error(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update tag" |
*
* @param {Ul_Tag_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_update_error = /** @type {((inputs?: Ul_Tag_Update_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Update_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_update_error(inputs)
	return __zh.ul_tag_update_error(inputs)
});
/**
* | output |
* | --- |
* | "Tag enabled" |
*
* @param {Ul_Tag_Enable_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_enable_success = /** @type {((inputs?: Ul_Tag_Enable_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Enable_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_enable_success(inputs)
	return __zh.ul_tag_enable_success(inputs)
});
/**
* | output |
* | --- |
* | "Tag disabled" |
*
* @param {Ul_Tag_Disable_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_disable_success = /** @type {((inputs?: Ul_Tag_Disable_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Disable_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_disable_success(inputs)
	return __zh.ul_tag_disable_success(inputs)
});
/**
* | output |
* | --- |
* | "Initialize Default Tags" |
*
* @param {Ul_Tag_Init_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_button = /** @type {((inputs?: Ul_Tag_Init_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_init_button(inputs)
	return __zh.ul_tag_init_button(inputs)
});
/**
* | output |
* | --- |
* | "Initializing..." |
*
* @param {Ul_Tag_Init_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_loading = /** @type {((inputs?: Ul_Tag_Init_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_init_loading(inputs)
	return __zh.ul_tag_init_loading(inputs)
});
/**
* | output |
* | --- |
* | "Default tags synced" |
*
* @param {Ul_Tag_Init_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_success = /** @type {((inputs?: Ul_Tag_Init_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_init_success(inputs)
	return __zh.ul_tag_init_success(inputs)
});
/**
* | output |
* | --- |
* | "Failed to initialize default tags" |
*
* @param {Ul_Tag_Init_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_error = /** @type {((inputs?: Ul_Tag_Init_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.ul_tag_init_error(inputs)
	return __zh.ul_tag_init_error(inputs)
});