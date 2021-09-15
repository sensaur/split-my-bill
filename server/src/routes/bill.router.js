const { Router } = require("express");
const billRouter = Router();
const { Bill, Bill_Split, Item, SubItem, User } = require("../db/models")
const { nanoid } = require('nanoid')

billRouter.post("/", async (req, res) => {
  const { list, name, user_id } = req.body;
  const size = 8;
  const code = nanoid(size)
  const newBill = await Bill.create({ name, code, status: false });
  const newBill_Split = await Bill_Split.create({
    bill_parent_id: newBill.id,
    user_id: user_id.id,
  });
  const allBillsItems = list.map((item) => {
    item.bill_id = newBill.id
    return item
  })
  const allItems = await Item.bulkCreate(allBillsItems)
  const newBillWithItems = await Bill.findOne({ where: { id: newBill.id }, include: { model: Item, where: { bill_id: newBill.id } } })

  res.json(newBillWithItems)
})

billRouter.post('/subitems', async (req, res) => {
  const { user_id, bill_id } = req.body;
  const usersSubitems = await SubItem.findAll({ where: { user_id }, include: { model: Item, where: { bill_id } }, raw: true, nest: true })

  res.json(usersSubitems);
})

billRouter.get('/users/:id', async (req, res) => {
  const bill_id = req.params.id;
  const currentBillUsers = await User.findAll({ include: { model: Bill_Split, where: { bill_parent_id: bill_id } }, raw: true, nest: true });
  res.json(currentBillUsers);
})

billRouter.post('/connect', async (req, res) => {
  const { user_id, bill_id } = req.body;
  try {
    const bill = await Bill.findOne({ where: { code: bill_id } })
    if (bill) {
      const existingBill = await Bill_Split.findOne({ where: { bill_parent_id: bill.id, user_id } })
      console.log(existingBill);
      if (existingBill) {
        const billWithItems = await Bill.findOne({ where: { id: bill.id }, include: { model: Item, where: { bill_id: bill.id } } })
        res.json(billWithItems);
      } else {
        await Bill_Split.create({ bill_parent_id: bill.id, user_id })
        const newBillWithItems = await Bill.findOne({ where: { id: bill.id }, include: { model: Item, where: { bill_id: bill.id } } })
        res.json(newBillWithItems);
      }
    } else {
      res.send('')
    }
  } catch (err) {
    res.send(err)
  }
  // const bill = await Bill.findByPk(bill_id)
})

billRouter.post('/item/delete', async (req, res) => {
  const { user_id, list } = req.body;
  for (let i = 0; i < list.length; i++) {
    await SubItem.destroy({ where: { item_id: list[i].id, user_id } })
  }
  res.sendStatus(204);
})

billRouter.post('/item/', async (req, res) => {
  const { myPart } = req.body;
  const allItems = await SubItem.bulkCreate(myPart)
  res.sendStatus(200)
})

billRouter.get('/item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const allSubItems = await SubItem.findAll({ where: { item_id: id } })
    const allSums = allSubItems.map((el) => el.sum);
    const total = allSums.reduce((acc, el) => acc + el);

    res.json({ sum: total })
  } catch (error) {
    res.json({ sum: 0 })
  }
})

billRouter.put('/item/:id', async (req, res) => {
  const { id } = req.params;
  const { nameItem } = req.body
  try {
    const item = await Item.findOne({ where: { id } });
    console.log(item);
    item.name = nameItem;
    item.save()
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
})

billRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const currentBill = await Bill.findOne({
    where: { id },
    include: { model: Item, where: { bill_id: id } },
  });
  setTimeout(() => {
    res.json(currentBill);
  }, 1300);
});

module.exports = billRouter;
