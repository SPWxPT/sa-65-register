package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Personal_ID    string `gorm:"uniqueIndex"`
	Email          string `gorm:"uniqueIndex"`
	Name           string
	GenderID       *uint
	Job_PositionID *uint
	ProvinceID     *uint
	Password       string
	// 1 employee ลงทะเบียนได้หลาย student
	Students []Student `gorm:"foreignKey:EmployeeID"`
}
type Gender struct {
	gorm.Model
	GENDER_NAME string
	// 1 เพศต่อ 1 student
	Students []Student `gorm:"foreignKey:GenderID"`
}
type Province struct {
	gorm.Model
	Name     string
	Students []Student `gorm:"foreignKey:ProvinceID"`
}
type Role struct {
	gorm.Model
	Role_name string
	Students  []Student `gorm:"foreignKey:RoleID"`
}
type Program struct {
	gorm.Model
	Program_name string
	Students     []Student `gorm:"foreignKey:ProgramID"`
}
type Student struct {
	gorm.Model
	STUDENT_NUMBER string `gorm:"uniqueIndex"`
	STUDENT_NAME   string
	PERSONAL_ID    string `gorm:"uniqueIndex"`
	Password       string
	//GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`
	//ProvinceID ทำหน้าที่เป็น FK
	ProvinceID *uint
	Province   Province `gorm:"references:id"`
	//ProgramID ทำหน้าที่เป็น FK
	ProgramID *uint
	Program   Program `gorm:"references:id"`
	//RoleID ทำหน้าที่เป็น FK
	RoleID *uint
	Role   Role `gorm:"references:id"`
	//EmpolyeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`
}
