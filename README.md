## To Do List

https://jsonplaceholder.typicode.com/todos?_limit=5 에서 초기 Todo 리스트를  
받아온 뒤 추가, 수정, 완료 처리, 삭제가 가능한 간단한 Todo-List SPA입니다.  
사용자가 작성한 내용은 Local Storage에 저장하여 새로 고침하여도 그대로 보이도록  
소스를 작성하였습니다.

## 구현 화면

![Todo Main](./src/img/todo_main.png)

## 사용 방법

1. To-do List 추가 : 상단의 "할 일을 입력해주세요!" input obx에 내용을 입력한 후 Add 버튼을 클릭하면 To-do List가 추가됩니다.
2. To-do List 수정 : List 목록의 Edit 버튼을 클릭하면 List의 input box가 활성화 됩니다. 내용 수정 후 Save버튼을 클릭하면 수정한 내용으로 저장 됩니다.
3. To-do List 완료 : List 목록의 Complete 버튼을 클릭하면 완료 , 미완으로 변경할 수 있습니다. 완료 처리된 항목은 회색으로 화면에 표시됩니다.
4. To-do List 삭제 : List 목록의 Delete 버튼을 클릭하면 삭제 처리 됩니다.
