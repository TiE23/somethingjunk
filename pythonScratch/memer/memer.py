#!/usr/bin/python
'''
Kyle Geib 2016

Python Meme generator using the http://memecaptain.com/ APIv3
Made in about 30 minutes for a giggle.

--Creating A VirtualEnv (Strongly Preferred)--
  It's recommended that you leverage Python's virtualenv system. With Python 3.5 or better:
  1) Run `sudo pip3 install virtualenv` to install virtualenv.
  2) Run `virtualenv -p `which python3` venv` (assuming you have an alias named python3)
  3) Launch the virtual env with `source venv/bin/activate`
  4) In the virtual environment run `pip install -r requirements.txt`
  Now you should be able to use the tool. Do you see the "(venv)" at the start of your line?
  To exit the virtual environment use `deactivate`. Remember this! :)
'''

import requests
from optparse import OptionParser
from time import sleep

class memer:
  sMyAPI = "389d596042c548392fe4ff27818c4006"

  def __init__(self):
    self.optionConstructor()

  def powerOn(self):
    dRequest= self.createRequest(self.options.image, self.options.top, self.options.bottom)
    sAPIUrl = "https://memecaptain.com/api/v3/gend_images"
    dHeaders = {"Authorization": "Token token=\"{}\"".format(self.sMyAPI)}

    r = requests.post(sAPIUrl,json=dRequest, headers=dHeaders)
    print(r.text)

    self.pollForResult(r.json()["status_url"]);

  def pollForResult(self, sStatusUrl):
    print("Polling")
    for x in range(10):
      r = requests.get(sStatusUrl)
      dResult = r.json()

      if dResult["error"] != None:
        print("something broke!")
        quit(1)

      if not dResult["in_progress"]:
        print("\n{}".format(dResult['url']))
        quit(0)

      print(".", end="")
      sleep(3)

  def createRequest(self, sImageCode, sTopText, sBottomText):
    dRequestBody = {
      "src_image_id": sImageCode,
      "private": False,
      "captions_attributes": [
        {
          "text": sTopText,
          "top_left_x_pct": 0.05,
          "top_left_y_pct": 0,
          "width_pct": 0.9,
          "height_pct": 0.25
        },
        {
          "text": sBottomText,
          "top_left_x_pct": 0.05,
          "top_left_y_pct": 0.75,
          "width_pct": 0.9,
          "height_pct": 0.25
        }
      ]
    }

    return dRequestBody

  def optionConstructor(self):
    optionsList = [
      [["-i", "--image"], {"help":"Image Code", "metavar":"code", "default":"ShGjDA"}],
      [["-t", "--top"], {"help":"Top Text", "metavar":"text", "default":"Top Text"}],
      [["-b", "--bottom"], {"help":"Bottom Text", "metavar":"text", "default":"Bottom Text"}]
    ]
    parser = OptionParser()

    for option in optionsList:
      parser.add_option(*option[0], **option[1])

    (self.options, self.args) = parser.parse_args()

# Do it.
memer = memer()
memer.powerOn()
