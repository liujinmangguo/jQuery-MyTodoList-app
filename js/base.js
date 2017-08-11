;(function(){
	// 'use strict'; 

	var $addTaskForm = $('.task-add');
	var $add = $addTaskForm.find('button');
	var $delTask;
	// var newTask = {}; //每一次都要新增
	var taskList = [];


	init();

	$add.on('click', function(e){
		var newTask = {}; 
		var $input = $addTaskForm.find('input')
		e.preventDefault();
		newTask.content = $input.val();
		if(!newTask.content) return;
		// addTask(newTask);
		// renderTaskList();
		//存入新taskitem
		if(addTask(newTask)){
			renderTaskList();
			newTask = {};
			$input.val(null);
		}
	});

	// $delTask.on('click', function(e){
	// 	e.preventDefault();
	// 	var $item = $(this).parents('.task-item');
	// 	// console.log($item.data('index'));
	// 	deleteTask($item.data('index'));
	// });

	function init(){
		store.clearAll();
		taskList = store.get('taskList') || [];
		if(taskList.length>=0){
			refreshTaskList();
		}
		
	}

	// 刷新localStorage并渲染tpl
	function refreshTaskList(){
		store.set('taskList', taskList);
		renderTaskList();

		$delTask = $('.del');
		console.log($delTask);
		$delTask.on('click', function(e){
			console.log($delTask);
			e.preventDefault();
			e.stopPagation();
			var $item = $(this).parents('.task-item');
			console.log($item.data('index'));
			// deleteTask($item.data('index'));
		});
		
	}

	function addTask(taskitem){
		taskList.push(taskitem);
		refreshTaskList();
		return true;
	}

	function deleteTask(index){
		// 如果没有index或taskList的index不存在
		if(!index || !taskList[index]) return;
		delete taskList[index];
		refreshTaskList();

	}

	function renderTaskList(){
		var $taskList = $('.task-list');
		$taskList.html('');
		for (var i = 0; i < taskList.length; i++) {
			var $task = renderTaskTpl(taskList[i], i);  
			$taskList.append($task);
			// console.log(taskList);
		}

		
	}

	function renderTaskTpl(data, index){
		var listItemTpl = `<div class="task-item" data-index="${index}">
				<span><input type="checkbox"></span>
				<span class="task-content">${data.content}</span>
				<span class="action">
					<span class="del">删除</span>
					<span class="detail">详情</span>
				</span>
			</div>`;
			return $(listItemTpl);
	}

})()



