package controller

import (
	"net/http"

	"github.com/SPWxPT/sa-65-register/entity"
	"github.com/gin-gonic/gin"
)

// * POST /program
func CreatePragram(c *gin.Context) {
	var program entity.Program
	if err := c.ShouldBindJSON(&program); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&program).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": program})
}

// * GET /program/:id
func GetProgram(c *gin.Context) {
	var programs entity.Program
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&programs); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "program not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": programs})
}

// * GET /program
func ListProgram(c *gin.Context) {
	var programs []entity.Program
	if err := entity.DB().Raw("SELECT * FROM programs").Scan(&programs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": programs})
}

// * DELETE /program/:id
func DeleteProgram(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM programs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "program not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// *PATCH /program
func UpdateProgram(c *gin.Context) {
	var program entity.Program
	if err := c.ShouldBindJSON(&program); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", program.ID).First(&program); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "program not found"})
		return
	}

	if err := entity.DB().Save(&program).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": program})
}
