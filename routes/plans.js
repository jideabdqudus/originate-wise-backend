const express = require("express")
const router = express.Router()

//@route GET api/plans
//@desc  Get user plans
//@access  Private
router.get("/", (req, res)=>{
    res.send("Get all plans")
})

//@route POST api/plans
//@desc  Add new plan
//@access  Private
router.post("/", (req, res)=>{
    res.send("Add a plan")
})


//@route PUT api/plans/:id
//@desc  Update plan
//@access  Private
router.put("/:id", (req, res)=>{
    res.send("Update plans")
})

//@route DELETE api/plans/:id
//@desc  Delete plan
//@access  Private
router.delete("/:id", (req, res)=>{
    res.send("Delete plans")
})

module.exports = router