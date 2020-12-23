import {Router} from "express"

const router = Router();

router.get("/", (req, res) => {
    res.send("Im Alive")
})


export default router;