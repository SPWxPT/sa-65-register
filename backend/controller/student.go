package controller

import (
	"net/http"

	"github.com/SPWxPT/sa-65-register/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// * POST /student
func CreateStudent(c *gin.Context) {

	var students entity.Student
	var gender entity.Gender
	var province entity.Province
	var program entity.Program
	var role entity.Role

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร student
	if err := c.ShouldBindJSON(&students); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", students.GenderID).First(&gender); tx.RowsAffected == 0 { //error
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 11: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", students.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// 13: ค้นหา Program ด้วย id
	if tx := entity.DB().Where("id = ?", students.ProgramID).First(&program); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "program not found"})
		return
	}

	// 13: ค้นหา Role ด้วย id
	if tx := entity.DB().Where("id = ?", students.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// เข้ารหัสลับจากบัตรประชาชนที่ Admin กรอกข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(students.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	students.Password = string(hashPassword)
	// 14: สร้าง Student
	std := entity.Student{
		STUDENT_NAME:   students.STUDENT_NAME,
		STUDENT_NUMBER: students.STUDENT_NUMBER,
		PERSONAL_ID:    students.PERSONAL_ID,
		Password:       students.Password,
		Gender:         gender,   // โยงความสัมพันธ์กับ Entity Gender
		Province:       province, // โยงความสัมพันธ์กับ Entity Province
		Program:        program,  // โยงความสัมพันธ์กับ Entity Program
		Role:           role,     // โยงความสัมพันธ์กับ Entity Role
	}

	// 15: บันทึก
	if err := entity.DB().Create(&std).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": std})

}

// GET /Student/:id
func GetStudent(c *gin.Context) {
	var student entity.Employee
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

// GET /student
func ListStudent(c *gin.Context) {

	var students []entity.Student

	if err := entity.DB().Preload("Gender").Preload("Program").Preload("Province").Raw("SELECT * FROM students").Find(&students).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": students})

}
