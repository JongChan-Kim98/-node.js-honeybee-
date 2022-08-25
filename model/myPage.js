const Sql = require("sequelize")

class MyPage extends Sql.Model{
    static init(sequelize){
        return super.init(
            {
                profilePicture : {
                    type : Sql.STRING(100),
                    allowNull:false,
                },
               
            },
            {
                sequelize,
                timestamps : true,
                modelName : "MyPage",
                tableName : "mypage",
                paranoid : false,
                charset : "utf8mb4",
                collate :"utf8mb4_general_ci",
            }
        )
    }
    static associate(db) {
        // belongsTo 함수를 사용해서 User 테이블과 연결 이 테이블이 자식
        // belongsTo 첫번째 매개변수는 연결될 테이블 이름
        // 유저의 id가 타겟이고 연결해주는 키는 nickName이다.
        db.MyPage.belongsTo(db.User,{foreignKey: "nickName", targetKey : "nickName"})
    }
}

module.exports = MyPage;