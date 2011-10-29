// 编辑者：周永丰
// -----航空公司信息修改
var company_code = new Ext.form.TextField({
			name : 'comCode',
			fieldLabel : '航空公司代号',
			allowBlank : false
		});
var company_name = new Ext.form.TextField({
			name : 'comName',
			fieldLabel : '航空公司名称',
			allowBlank : false
		});
var company_address = new Ext.form.TextField({
			name : 'comAddress',
			fieldLabel : '航空公司地址',
			allowBlank : false
		});
var company_information = new Ext.form.HtmlEditor({
			fieldLabel : '航空公司信息',
			name : 'comInformation',
			enableAlignments : true,
			enableColors : true,
			enableFont : true,
			enableFontSize : true,
			enableFormat : true,
			enableLinks : true,
			enableLists : true,
			enableSourceEdit : true
		});

var form = new Ext.form.FormPanel({
			// title : '<font size=2>航空公司信息修改</font>',
			labelSeparator : ':',
			labelWidth : 80,// 标签宽度
			// iconCls : 'information',
			region : 'east',
			bodyStyle : 'padding:5 5 5 5',
			frame : true,
			autoheight : true,
			width : '50%',
			items : [company_code, company_name, company_address,
					company_information],
			buttons : [{
				text : '<font size=2>修改</font>',
				iconCls : 'application_edit',
				handler : function() {
					if (grid.getSelectionModel().getSelections().length == 0) {
						JsHelper.ShowError("请选择一行!");
						return;
					} else if (!form.getForm().isValid())
						return;
					else if (company_information.getValue().trim() == "") {
						JsHelper.ShowError("编辑文本区不为空!");
						return;
					}

					var row = grid.getSelectionModel().getSelected();
					Ext.Ajax.request({
								url : 'Flightcompany?type=update',
								params : {
									comAutoid : row.get('comAutoid'),
									comCode : form.getForm()
											.findField('comCode').getValue(),
									comName : form.getForm()
											.findField('comName').getValue(),
									comAddress : form.getForm()
											.findField('comAddress').getValue(),
									comInformation : form.getForm()
											.findField('comInformation')
											.getValue()
								},
								success : function() {
									JsHelper.OK("操作成功!", function() {
												store.reload();
											});
								},
								failure : function() {
									JsHelper.ShowError("操作失败(航空公司代号可能重复)!");
								}
							})
				}
			}, {
				text : '<font size=2>重置</font>',
				iconCls : 'arrow_undo',
				handler : function() {
					var row = grid.getSelectionModel().getSelections();
					if (row.length == 0)
						return;
					form.getForm().reset();
					form.getForm().loadRecord(row[0]);
				}
			}]
		});

// -----增加信息
var company_code1 = new Ext.form.TextField({
			name : 'comCode',
			fieldLabel : '航空公司代号',
			allowBlank : false
		});
var company_name1 = new Ext.form.TextField({
			name : 'comName',
			fieldLabel : '航空公司名称',
			allowBlank : false
		});
var company_address1 = new Ext.form.TextField({
			name : 'comAddress',
			fieldLabel : '航空公司地址',
			allowBlank : false
		});
var company_information1 = new Ext.form.HtmlEditor({
			fieldLabel : '航空公司信息',
			name : 'comInformation',
			enableAlignments : true,
			enableColors : true,
			enableFont : true,
			enableFontSize : true,
			enableFormat : true,
			enableLinks : true,
			enableLists : true,
			enableSourceEdit : true
		});
var form1 = new Ext.FormPanel({
			labelSeparator : ':',
			labelWidth : 80,// 标签宽度
			frame : true,
			autoheight : true,
			items : [company_code1, company_name1, company_address1,
					company_information1]
		});
var win = new Ext.Window({
			title : '<font size=2>增加信息</font>',
			modal : true,
			width : '60%',
			autoheight : true,
			resizable : false,
			plain : true,
			iconCls : 'information',
			bodyStyle : 'padding:5px;',
			buttonAlign : 'center',
			closeAction : 'hide',
			items : form1,
			listeners : {
				"show" : function() {
				}
			},
			buttons : [{
						text : '<font size=2>增加</font>',
						iconCls : 'add',
						handler : function() {
							if (!form1.getForm().isValid())
								return;
							if (company_information1.getValue().trim() == "") {
								JsHelper.ShowError("编辑文本区不为空!");
								return;
							}
							form1.getForm().submit({
										url : 'Flightcompany?type=add',
										success : function() {
											JsHelper.OK("操作成功!", function() {
														store.reload();
													});
										},
										failure : function() {
											JsHelper
													.ShowError("操作失败(航空公司代号可能重复)!");
										}
									})
						}
					}, {
						text : '<font size=2>清空</font>',
						iconCls : 'arrow_rotate_anticlockwise',
						handler : function() {
							form1.getForm().reset();
						}
					}]
		});

// -----航空公司信息表格显示
var start = 0;
var limit = 10;
var store = new Ext.data.JsonStore({
			root : 'root',
			totalProperty : 'totalCount',
			url : 'Flightcompany?type=queryall',
			fields : [{
						name : 'comAutoid'
					}, {
						name : 'comCode'
					}, {
						name : 'comName'
					}, {
						name : 'comAddress'
					}, {
						name : 'comRegister'
					}, {
						name : 'comInformation'
					}]
		});
var grid = new Ext.grid.GridPanel({
			title : '<font size=2>航空公司信息表格显示</font>',
			stripeRows : true, // 斑马线
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),// 只允许选中一行
			trackMouseOver : true,
			width : '40%',
			store : store,
			iconCls : 'information',
			region : 'center',
			autoheight : true,
			frame : true,
			loadMask : {
				msg : '正在加载数据，请稍侯……'
			},
			listeners : {
				"rowclick" : function() {
					var row = grid.getSelectionModel().getSelections();
					form.getForm().reset();
					form.getForm().loadRecord(row[0]);
				}
			},
			viewConfig : {
				forceFit : true
			},
			columns : [
					new Ext.grid.RowNumberer(), // 行号
					{
						header : '<font size=2>代号</font>',
						dataIndex : 'comCode',
						sortable : true
					}, {
						header : '<font size=2>名称</font>',
						dataIndex : 'comName',
						sortable : true
					}, {
						header : '<font size=2>地址</font>',
						dataIndex : 'comAddress',
						sortable : true
					}, {
						header : '<font size=2>注册时间</font>',
						dataIndex : 'comRegister',
						sortable : true
					}],
			// 顶部操作栏
			tbar : new Ext.Toolbar(['->', '-', {
						text : '<font size=2>增加信息</font>',
						iconCls : 'add',
						handler : function() {
							win.show()
						}
					}, '-', {
						text : '<font size=2>删除信息</font>',
						iconCls : 'delete',
						handler : function() {
							if (grid.getSelectionModel().getSelections().length == 0) {
								JsHelper.ShowError("请选择一行!");
								return;
							}

							var row = grid.getSelectionModel().getSelected();
							Ext.Ajax.request({
										url : 'Flightcompany?type=delete',
										params : {
											comAutoid : row.get('comAutoid')
										},
										success : function() {
											JsHelper.OK("操作成功!", function() {
														store.reload();
													});
										},
										failure : function() {
											JsHelper.ShowError("操作失败!");
										}
									})
						}
					}, '-']),
			// 底部分页栏
			bbar : new Ext.PagingToolbar({
						pageSize : limit,
						store : store,
						displayInfo : true,// 显示分页按钮
						displayMsg : '<font size=2>第 {0} 条到 {1} 条,一共 {2} 条记录</font>',
						emptyMsg : '没有记录'
					})
		});
Ext.onReady(function() {
			Ext.QuickTips.init();// 初始化
			// -----左边显示表格，右边显示信息修改
			new Ext.Viewport({
						layout : 'border',
						items : [grid, form]
					});
			// -----装载数据
			store.load({
						params : {
							start : start,
							limit : limit
						}
					});
		})