$(function () {
	// Backlog 情報
	var api_key_for_nagase = 'kQwZHGM6XRmzXphZlOCZ5h2eAIhAeWCHDxR0uhdn9rkA2rADp6VrpKAuj9PIyvVb' // 長瀬更新用
	var api_key_for_kuchiishi = 'LGJg5EXVJQiou7QH4AlnEcKARyAKdUn8mnwqJNI6Es5VMp0HzAra7RJLuGkmo0IP' // 口石更新用
	var api_key_for_fujita = 'Okwv4SZqX2cLgrMwXRIOkOi3p9gBstBb7hcApE5zIWHNF3tBK3ecKUSTT0lnjAYG' // 藤田更新用
	var api_key_for_tabata = 'Z1z5mnlPtaYNXyt4b0pjVc8dTrSsoW4A56DlSKw33k0TiOX7qLoe9aTZM6IkJPj5' // 田畑更新用
	var api_key_for_yanagisawa = 'QyvPAZmNxUF3EErxHtk1C5Q64AoYQMzZ51kE2HQ0LllTZ8aC5pepsRz8os3fOxjI' // 柳澤更新用
	var api_key_for_takahashi = 'wZnQeH5srC2REDvNM1nIa8GYa6A72qCn6rCrt1aRECUsMsIfo41qDcfDyA836Tuo' // 高橋更新用
	var base_url = 'https://pega-sys.backlog.com'
	var project_id = '215642'	// プロジェクト：各種申請
	var issuetype_id_mtgapply = '1045530'	// 種別：MTG申請
	var issuetype_id_holiday = '1045645'	// 種別：休暇申請
	var issuetype_id_behindtime = '1045529'	// 種別：遅刻申請
	var issuetype_id_leaveearly = '1045528'	// 種別：早退申請
	var issuetype_id_holidaywork = '1045713'	// 種別：休出申請
	var issuetype_id_workremotely = '1045714'	// 種別：在宅申請
	var issuetype_id_waitinghome = '1061609'	// 種別：自宅待機申請
	var issuetype_id_othersapply = '1045531'	// 種別：その他申請
	var status_id_rejected = '59558'			// 状態：却下
	var assignee_id = '408915'	// 担当者：長瀬紗耶

	var exp = /((?<!href="|href='|src="|src=')(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

	/** 届出課題一覧を取得 */
	function get_tickets() {
		// テーブルを空にする
		$('.list-tr').remove();

		// URL取得
		var url;
		var kbn = $('input[name="issue-type"]:checked').val();
		var check = $('input[name="status"]:checkbox').is(':checked');
		if (kbn == '1') {
			// 届出取得用URL
			if (check){
				url = base_url + '/api/v2/issues'
				+ '?' + 'apiKey=' + api_key_for_nagase
				+ '&' + 'projectId[]=' + project_id						// プロジェクト指定
				+ '&' + 'issueTypeId[]=' + issuetype_id_holiday			// 種別指定：休暇申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_behindtime		// 種別指定：遅刻申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_leaveearly		// 種別指定：早退申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_holidaywork		// 種別指定：休出申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_workremotely	// 種別指定：在宅申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_waitinghome		// 種別指定：自宅待機申請
				+ '&' + 'issueTypeId[]=' + issuetype_id_othersapply		// 種別指定：その他申請
				+ '&' + 'statusId[]=' + '4'					// 完了
				+ '&' + 'order=' + 'asc'					// 昇順
				+ '&' + 'count=' + '100'					// 取得件数

				;
			}else{
				url = base_url + '/api/v2/issues'
					+ '?' + 'apiKey=' + api_key_for_nagase
					+ '&' + 'projectId[]=' + project_id						// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + issuetype_id_holiday			// 種別指定：休暇申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_behindtime		// 種別指定：遅刻申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_leaveearly		// 種別指定：早退申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_holidaywork		// 種別指定：休出申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_workremotely	// 種別指定：在宅申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_waitinghome		// 種別指定：自宅待機申請
					+ '&' + 'issueTypeId[]=' + issuetype_id_othersapply		// 種別指定：その他申請
					+ '&' + 'assigneeId[]=' + assignee_id		// 担当者
					+ '&' + 'statusId[]=' + '1'					// 未対応
					+ '&' + 'statusId[]=' + '2'					// 処理中
					+ '&' + 'statusId[]=' + '3'					// 処理済み
					+ '&' + 'order=' + 'asc'					// 昇順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}
				
		} else {
			// MTG申請取得用URL
			if (check){
				url = base_url + '/api/v2/issues'
					+ '?' + 'apiKey=' + api_key_for_nagase
					+ '&' + 'projectId[]=' + project_id			// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + issuetype_id_mtgapply	// 種別指定：MTG申請
					+ '&' + 'statusId[]=' + '4'					// 完了
					+ '&' + 'order=' + 'asc'					// 昇順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}else{
				url = base_url + '/api/v2/issues'
					+ '?' + 'apiKey=' + api_key_for_nagase
					+ '&' + 'projectId[]=' + project_id			// プロジェクト指定
					+ '&' + 'issueTypeId[]=' + issuetype_id_mtgapply	// 種別指定：MTG申請
					+ '&' + 'statusId[]=' + '1'					// 未対応
					+ '&' + 'statusId[]=' + '2'					// 処理中
					+ '&' + 'statusId[]=' + '3'					// 処理済み
					+ '&' + 'order=' + 'asc'					// 昇順
					+ '&' + 'count=' + '100'					// 取得件数
					;
			}
		}

		var issue_list = $.getJSON(url, function (data, textStatus, jqXHR) { });

		issue_list.done(function (data) {
			// テーブルに追加
			set_tables(data);

		}).fail(function () {
			console.log("error");	
		});
	};


	/** 画面：テーブルの追加 */
	function set_tables(data) {
		var check = $('input[name="status"]:checkbox').is(':checked');

		for (var i = 0; i < data.length; i++) {
			var issueKey = data[i]["issueKey"];				// 課題
			var keyId = data[i]["keyId"];					// 課題ID
			var startDate = data[i]["startDate"]			// 開始日
			if (startDate != null){
				var date = new Date(startDate);
				startDate = date.getFullYear() + '/' + parseInt(date.getMonth()+1) + '/' + date.getDate();
			}else{
				startDate = '未設定'
			}

			var dueDate = data[i]["dueDate"]				// 期限日
			if (dueDate != null){
				var date = new Date(dueDate);
				dueDate = date.getFullYear() + '/' + parseInt(date.getMonth()+1) + '/' + date.getDate();
			}else{
				dueDate = '未設定'
			}
			var created = data[i]["created"] 		// 起票日
			var dateObject = new Date(created);
			var year = dateObject.getFullYear();
			var month = dateObject.getMonth() + 1; // 月は0から始まるため+1する
			var day = dateObject.getDate();
			var formattedMonth = month < 10 ? `0${month}` : month;
			var formattedDay = day < 10 ? `0${day}` : day;
			created = `${year}/${formattedMonth}/${formattedDay}`;

			var category = ''
			var category_id = []
			if (data[i]["category"].length != 0){
				for (var j = 0;j<data[i]["category"].length;j++){
					// 完了以外はカテゴリは1件の想定
					if(j == data[i]["category"].length-1){
						// カテゴリ更新時に既存のカテゴリIDを渡す必要がある。)
						category_id.push(data[i]["category"][j]["id"])
						// ループ最終の場合、改行を足さない
						category += data[i]["category"][j]["name"]	// カテゴリ
					}else{
						category_id.push(data[i]["category"][j]["id"])

						category += data[i]["category"][j]["name"] + '<br>'	// カテゴリ
					}
				}
			}

			var summary = data[i]["summary"];				// 件名
			var description = data[i]["description"];		// 詳細
			var assignee = data[i]["assignee"]["name"];		// 担当者
			var status = data[i]["status"]["name"];			// 状態
			var create_user = data[i]["createdUser"]["id"];	// 課題申請者

			// 詳細の改行を変換
			description = description.replace(/\r?\n/g, '<br>');

			var tr = $('<tr class="list-tr"></tr>');
			var td_startDate = $('<td>' + startDate + '</td>')
			var td_dueDate = $('<td>' + dueDate + '</td>')
			var td_created = $('<td>' + created + '</td>')

			var td_category = $('<td>' + category + '</td>')
			var td_summary = $('<td>' + summary + '</td>')
			var td_description = $('<td><div id="td-description-' + keyId + '">' + description + '</div></td>')
			var td_assignee = $('<td>' + assignee + '</td>')
			var td_status = $('<td>' + status + '</td>')
			
			var td = $('<td></td>')
			var td_operation = $('<div class="td-operation"></div>')
			if (check){
				// 完了済の場合、差戻の操作ボタンを作成
				var btn_remand = $('<button type="button" class="m-1 btn btn-primary remand" data-category = "' + category_id[0] + '" value="' + issueKey + '">差戻</button>')
				td_operation.append(btn_remand)
			}else{
				// 完了済みでない場合、承認/却下の操作ボタンを作成
				var btn_approval = $('<button type="button" class="m-1 btn btn-primary approval" data-crtuser ="' + create_user + '" data-category = "' + category_id[0] + '" value="' + issueKey + '">承認</button>')
				var btn_rejected = $('<button type="button" class="m-1 btn btn-secondary rejected" data-crtuser ="' + create_user + '" value="' + issueKey + '">却下</button>')
				td_operation.append(btn_approval, btn_rejected)
			}
			td.append(td_operation)
			tr.append(td_summary, td_category, td_startDate, td_dueDate, td_created, td_description, td_assignee, td_status, td)
		

			$('tbody').append(tr);
			// 詳細のURLをリンク付きに変換
			$('#td-description-' + keyId).html($('#td-description-' + keyId).html().replace(exp, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'))
		}
	};


	/** 課題の更新(承認) */
	function update_ticket_approval(issuekey ,ctruser, selectpoint='0', category='') {
		var kbn = $('input[name="issue-type"]:checked').val();
		var update_user = $('#update-user').val()

		// url生成
		var url = create_url(issuekey);

		// 承認時のパラメータ
		var payload = {}
		if (kbn == '2' && update_user != '0'){
			// MTG申請かつ長瀬さん以外の更新の場合、処理済みに変更して長瀬さんに担当変更する
			payload = {"statusId": '3',"assigneeId": assignee_id} 
		}else{
			// MTG申請かつ長瀬さん更新の場合
			// MTG申請ではない場合、完了にして課題作成者に担当変更する
			payload = {"statusId": '4',"assigneeId": ctruser} 
		}
		
		if (selectpoint != '0'){
			// マイナス設定なし以外かつカテゴリ設定済みの場合、設定されているカテゴリ＋マイナスポイントを設定する
			if(category != ''){
				payload["categoryId[]"] = [category,selectpoint]
			}
			// マイナス設定なし以外かつカテゴリ未設定の場合、マイナスポイントのみ設定する
			else{
				payload["categoryId[]"] = selectpoint
			}
		}

		return ajax(url,payload)
	};


	/** 課題の更新(却下) */
	function update_ticket_rejected(issuekey, ctruser, comment) {
		// url生成
		var url = create_url(issuekey);

		// 却下時のパラメータ
		var payload = {
			"statusId": status_id_rejected, // 状態：却下
			"assigneeId": ctruser,			// 担当者：申請者
			"comment": comment				// コメント
		}

		return ajax(url,payload);
	};

	/** 課題の更新(差戻) */
	function update_ticket_remand(issuekey,category) {
		var kbn = $('input[name="issue-type"]:checked').val();
		// url生成
		var url = create_url(issuekey);

		// 差戻時のパラメータ
		var payload = {
			"statusId": '1',			// 状態：未対応
		}
		if (kbn == '1'){
			payload["categoryId[]"] = category
		}

		return ajax(url,payload);
	};

	
	function create_url(issuekey) {
		var user = $('#update-user').val()
		var kbn = $('input[name="issue-type"]:checked').val();

		// 初期値は長瀬さんの設定
		var apikey = api_key_for_nagase

		if (kbn == '2'){
			// MTG申請ならばプルダウンを参照して、更新者を変更する
			if (user == '0'){
				apikey = api_key_for_nagase
			}else if(user == '1'){
				apikey = api_key_for_kuchiishi
			}else if(user == '2'){
				apikey = api_key_for_fujita
			}else if(user == '3'){
				apikey = api_key_for_tabata
			}else if(user == '4'){
				apikey = api_key_for_takahashi
			}else if(user == '5'){
				apikey = api_key_for_yanagisawa
			}
		}

		// url生成
		var url = base_url + '/api/v2/issues'
		+ '/' + issuekey
		+ '?' + 'apiKey=' + apikey
		;
		return url;
	};


	function ajax(url,payload) {
		// 課題更新処理
		$.ajax({
			type: 'PATCH',
			url: url,
			data: payload
		}).done(function (result) {
			// 成功処理
			// 課題一覧の再取得
			get_tickets();
			return result;
		}).fail(function (result) {
			// 失敗処理
			console.log('失敗', result);
			return result;
		});
	};


	/** jQueryが読まれた時 */
	$(document).ready(function () {
		// 課題一覧の取得
		get_tickets();
	});


	/** 検索タブを変更 */
	$('input[name="issue-type"]:radio').on('change',function () {

		var kbn = $('input[name="issue-type"]:checked').val();
		if (kbn == '2'){
			$('.select-update-user').css('visibility','visible');
		}else{
			$('.select-update-user').css('visibility','hidden');
		}

		// 課題一覧の取得
		get_tickets();
	});

	
	/** チェックボックス変更 */
	$('input[name="status"]:checkbox').on('change',function () {

		// 課題一覧の取得
		get_tickets();
	});
	

	/** 承認ボタン押下 */
	$(document).on("click", ".approval", function () {
		var issuekey = $(this).val();
		var kbn = $('input[name="issue-type"]:checked').val();
		var category = String($(this).data('category'));
		var ctruser = String($(this).data('crtuser'));

		// ポイントのマイナスはどうするかの確認ダイアログ
		if  (kbn == '1'){

			$('#point-dialog').dialog({
				modal: true,
				title:'ポイント選択',
				width:'250',
				height:'200',
				fruid:true,
				create:function(event,ui){
				},
				buttons: [{
					text:'OK',
					class: 'ok-button',
					click:function(){
						var selectpoint = $('#select-point').val()

						// 更新
						update_ticket_approval(issuekey,ctruser,selectpoint,category);

						$('#select-point').val(['0']);
	
						$(this).dialog('close');
					},
				},{
					text:'キャンセル',
					class: 'cancel-button',
					click:function(){
						$(this).dialog('close');
					}
				}],
				close: function(){
					$('.cancel-button').off('click');
				}
			});

		}else{
			// MTG申請時はポイントの増減なし
			// 更新処理
			update_ticket_approval(issuekey,ctruser);
		}

	});


	/** 却下ボタン押下 */
	$(document).on("click", ".rejected", function () {
		var issuekey = $(this).val();
		var ctruser = String($(this).data('crtuser'));
		
		// コメント追加のダイアログ
		$('#cancel-dialog').dialog({
			modal: true,
			title:'却下理由入力',
			width:'500',
			height:'300',
			fruid:true,
			create:function(event,ui){
			},
			buttons: [{
				text:'OK',
				class: 'ok-button',
				click:function(){
					var comment = $('#cancel-textarea').val();
					// コメントの改行を変換する
					var replace_comment = comment.replace(/\n/g, '&br;');
					
					// 更新
					update_ticket_rejected(issuekey,ctruser,replace_comment);

					// 他却下処理時にコメントが残ったままになるので削除する
					$('#cancel-textarea').val('');
					$(this).dialog('close');
				},
			},{
				text:'キャンセル',
				class: 'cancel-button',
				click:function(){
					$('#cancel-textarea').val('');
					$(this).dialog('close');
				}
			}],
			close: function(){

				$('.cancel-button').off('click');
			}
		});

	});


	/** 差戻ボタン押下 */
	$(document).on("click", ".remand", function () {
		var issuekey = $(this).val();
		var category = String($(this).data('category'));


		// 差戻処理
		update_ticket_remand(issuekey,category);
	});
});
