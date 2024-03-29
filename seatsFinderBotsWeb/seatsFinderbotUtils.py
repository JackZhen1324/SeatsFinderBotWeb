from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from argparse import ArgumentParser
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from selenium.webdriver.chrome.options import Options

import pickle
import time
import logging
import datetime
import urllib.request
import threading
import sys
import unicodedata

statusURL = "http://104.154.119.236/api/WebAPI?GetSuperPowerVMTaskSchedulerStatus=true&guid="
checkURL = "http://104.154.119.236/api/WebAPI?checkStatusByBot=true&prefix=&number=&location=Tempe&term="
superPowerStatusURL = "http://104.154.119.236/api/WebAPI?registerStatusNotify=true&status="
myEmail = "mopjtv@gmail.com"


def get_local_time():
    current_time = datetime.datetime.now().strftime("%H:%M")
    logging.info("get_local_time(): %s", current_time)
    return str(current_time)


def get_local_time_inSec():
    current_time = datetime.datetime.now().strftime("%H:%M:%S")
    logging.info("get_local_time(): %s", current_time)
    return str(current_time)


def check_exists_by_id(id, driver):
    try:
        driver.find_element_by_id(id)
    except:
        return False
    return True


def semesterIndex(semesterCombo):
    if semesterCombo == "Spring+2019":
        return "2191"
    if semesterCombo == "Spring+2020":
        return "2201"
    if semesterCombo == "Spring+2021":
        return "2211"
    if semesterCombo == "Spring+2022":
        return "2221"
    if semesterCombo == "Spring+2023":
        return "2231"
    if semesterCombo == "Spring+2024":
        return "2241"
    if semesterCombo == "Spring+2025":
        return "2251"
    if semesterCombo == "Fall+2019":
        return "2197"
    if semesterCombo == "Fall+2020":
        return "2207"
    if semesterCombo == "Fall+2021":
        return "2217"
    if semesterCombo == "Fall+2022":
        return "2227"
    if semesterCombo == "Fall+2023":
        return "2237"
    if semesterCombo == "Fall+2024":
        return "2247"
    if semesterCombo == "Fall+2025":
        return "2257"


def addClass(level, username, password, sectionNum, semesterCombo):
    driver = webdriver.Chrome(ChromeDriverManager().install())

    STRM = semesterIndex(semesterCombo)

    driver.get("https://go.oasis.asu.edu/addclass/?STRM=" +
               str(STRM) + "&ACAD_CAREER=" + level)

    driver.switch_to_frame(driver.find_element_by_xpath(
        "//frame[@src='https://weblogin.asu.edu/cgi-bin/login?callapp=https%3A//go.oasis.asu.edu/waitframeset.html%3Fdelay%3D3500%26url%3Dhttps%253A//cs.oasis.asu.edu/asucsprd/golink/%253F/EMPLOYEE/PSFT_ASUCSPRD/s/WEBLIB_ASU_SA.ASU_SA_ISCRIPT.FieldFormula.IScript_SA%253FURL%253D/EMPLOYEE/PSFT_ASUCSPRD/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL%25253FSTRM%25253D" + str(
            STRM) + "%252526ACAD_CAREER%25253D" + level + "%252526Page%25253DSSR_SSENRL_ADD%252526Action%25253DA%252526INSTITUTION%25253DASU00%252526golink%25253DY']"))
    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_class_name("submit").send_keys(Keys.RETURN)

    driver.switch_to_frame(0)
    driver.switch_to_frame(0)
    driver.switch_to_frame(2)

    time.sleep(1)

    # Empty Shopping Cards
    while check_exists_by_id("P_DELETE$0", driver):
        driver.find_element_by_id("P_DELETE$0").send_keys(Keys.RETURN)
        time.sleep(1)
    time.sleep(1)

    # Enter Section Number
    driver.find_element_by_id(
        "DERIVED_REGFRM1_CLASS_NBR").send_keys(sectionNum)
    driver.find_element_by_id(
        "DERIVED_REGFRM1_SSR_PB_ADDTOLIST2$9$").send_keys(Keys.RETURN)

    # Add Class
    driver.implicitly_wait(10)
    driver.find_element_by_id(
        "DERIVED_CLS_DTL_NEXT_PB$280$").send_keys(Keys.RETURN)

    driver.implicitly_wait(10)
    driver.find_element_by_id(
        "DERIVED_REGFRM1_LINK_ADD_ENRL$82$").send_keys(Keys.RETURN)

    driver.implicitly_wait(10)
    driver.find_element_by_id(
        "DERIVED_REGFRM1_SSR_PB_SUBMIT").send_keys(Keys.RETURN)

    driver.implicitly_wait(10)
    status = driver.find_element_by_id("win0divSSR_SS_ERD_ER$0").text

    FinalStatus = ""

    if "Error" in status:
        FinalStatus = "FailEnrolled"
    elif "Success" in status:
        FinalStatus = "SuccessEnrolled"

    else:
        FinalStatus = "UnknownStatus"
    return FinalStatus


def swapClass(level, username, password, sectionNum, swapWith, semesterCombo):
    driver = webdriver.Chrome(ChromeDriverManager().install())

    STRM = semesterIndex(semesterCombo)

    driver.get("https://go.oasis.asu.edu/swapclass/?STRM=" +
               str(STRM) + "&ACAD_CAREER=" + level + "&ASU_CLASS_NBR=" + str(sectionNum))

    driver.switch_to_frame(driver.find_element_by_xpath(
        "//frame[@src='https://weblogin.asu.edu/cgi-bin/login?callapp=https%3A//go.oasis.asu.edu/waitframeset.html%3Fdelay%3D3500%26url%3Dhttps%253A//cs.oasis.asu.edu/asucsprd/golink/%253F/EMPLOYEE/PSFT_ASUCSPRD/s/WEBLIB_ASU_SA.ASU_SA_ISCRIPT.FieldFormula.IScript_SA%253FURL%253D/EMPLOYEE/PSFT_ASUCSPRD/c/SA_LEARNER_SERVICES.SSR_SSENRL_SWAP.GBL%25253FSTRM%25253D" + str(
            STRM) + "%252526ACAD_CAREER%25253D" + level + "%252526ASU_CLASS_NBR%25253D" + str(
            sectionNum) + "%252526Page%25253DSSR_SSENRL_SWAP%252526Action%25253DA%252526INSTITUTION%25253DASU00%252526golink%25253DY']"))

    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_class_name("submit").send_keys(Keys.RETURN)

    driver.switch_to_frame(0)
    driver.switch_to_frame(0)
    driver.switch_to_frame(2)

    time.sleep(1)

    # Empty Shopping Cards
    while check_exists_by_id("P_DELETE$0", driver):
        driver.find_element_by_id("P_DELETE$0").send_keys(Keys.RETURN)
        time.sleep(1)

    # Select class from dropdownlist
    dropdownlist = driver.find_element_by_id("DERIVED_REGFRM1_DESCR50$225$")

    # create select element object
    selectElement = Select(dropdownlist)

    # select by value
    selectElement.select_by_value(str(swapWith))

    # Click Enter
    driver.implicitly_wait(10)
    driver.find_element_by_id(
        "DERIVED_REGFRM1_SSR_PB_ADDTOLIST2$106$").send_keys(Keys.RETURN)

    # Click Next
    driver.implicitly_wait(10)
    driver.find_element_by_id("DERIVED_CLS_DTL_NEXT_PB").send_keys(Keys.RETURN)

    # Click Finish Swaping
    driver.implicitly_wait(10)
    driver.find_element_by_id(
        "DERIVED_REGFRM1_SSR_PB_SUBMIT").send_keys(Keys.RETURN)

    driver.implicitly_wait(10)
    status = driver.find_element_by_id("win0divSSR_SS_ERD_ER$0").text

    FinalStatus = ""

    if "Error" in status:
        FinalStatus = "FailEnrolled"
    elif "Success" in status:
        FinalStatus = "SuccessEnrolled"
    else:
        FinalStatus = "UnknownStatus"
    return FinalStatus


def urlErrorCheck(url):
    req = Request(url)
    try:
        response = urlopen(req).read()
    except HTTPError as e:
        print('Error code: ', e.code)
        return "ERRORURL"
    except URLError as e:
        print('Reason: ', e.reason)
        return "ERRORURL"
    else:
        return response


