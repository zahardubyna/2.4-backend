import express from 'express'
import {login, register, logout, getItems, changeItem, addItem, deleteItem} from "../controllers/controllers";

const router = express.Router()

router.all("/", (req, res) => {
  let action : string = req.query.action as string;
  switch (action) {
    case "login": {
        login(req, res);
        break;
    }
    case "logout": {
        logout(req, res);
        break;
    }
    case "register": {
        register(req, res);
        break;
    }
    case "getItems": {
        getItems(req, res);
        break;
    }
    case "createItem": {
        addItem(req, res);
        break;
    }
    case "editItem": {
        changeItem(req, res);
        break;
    }
    case "deleteItem": {
        deleteItem(req, res);
        break;
    }
    default:
      res.status(400).send({ error: `Unknown request command: ${action}` });
  }
});

export default router;