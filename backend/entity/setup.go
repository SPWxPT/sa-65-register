package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Employee{},
		&Gender{},
		&Province{},
		&Program{},
		&Role{},
		&Student{},
	)
	db = database

	Epass1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14) //* เข้ารหัส password
	Epass2, err := bcrypt.GenerateFromPassword([]byte("5678"), 14)
	pass4, err := bcrypt.GenerateFromPassword([]byte("5678"), 14)

	db.Model(&Employee{}).Create(&Employee{ //* add ข้อมูล Employee
		Name:        "Jacky",
		Email:       "jacky@gmail.com",
		Personal_ID: string(Epass1),
	})
	db.Model(&Employee{}).Create(&Employee{
		Name:        "Paul",
		Email:       "paul@gmail.com",
		Personal_ID: string(Epass2),
	})

	var Jacky Employee
	var Paul Employee
	db.Raw("SELECT * FROM employees WHERE employee_email = ?", "jacky@gmail.com").Scan(&Jacky) //* ตรวจสอบเข้าระบบ
	db.Raw("SELECT * FROM employees WHERE employee_email = ?", "paul@gmail.com").Scan(&Paul)

	// --- Gender Data
	gender1 := Gender{
		GENDER_NAME: "Male",
	}
	db.Model(&Gender{}).Create(&gender1)

	gender2 := Gender{
		GENDER_NAME: "Female",
	}
	db.Model(&Gender{}).Create(&gender2)

	// --- Province Data
	province1 := Province{
		Name: "Kamphaeng Phet",
	}
	db.Model(&Province{}).Create(&province1)
	province2 := Province{
		Name: "Chiang Rai",
	}
	db.Model(&Province{}).Create(&province2)
	province3 := Province{
		Name: "Angthong",
	}
	db.Model(&Province{}).Create(&province3)
	// --- Program Data
	p1 := Program{
		Program_name: "Computer engineering",
	}
	db.Model(&Program{}).Create(&p1)
	p2 := Program{
		Program_name: "Telecommunication engineering",
	}
	db.Model(&Program{}).Create(&p2)
	p3 := Program{
		Program_name: "Program in Biology",
	}
	db.Model(&Program{}).Create(&p3)
	p4 := Program{
		Program_name: "Institute of Nursing",
	}
	db.Model(&Program{}).Create(&p4)

	// --- Role Data
	role1 := Role{
		Role_name: "Admin",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Role_name: "Student",
	}
	db.Model(&Role{}).Create(&role2)

	//student data
	db.Model(&Student{}).Create(&Student{
		STUDENT_NUMBER: "1234567",
		STUDENT_NAME:   "akira komisu",
		PERSONAL_ID:    "12345677777",
		Password:       string(pass4),
		Program:        p4,
		Gender:         gender1,
		Role:           role1,
		Province:       province1,
	})
}
