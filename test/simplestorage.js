const JobInterviewContract = artifacts.require("./JobInterview.sol");

contract("JobInterview", accounts => {
  it("...should return the proper string.", async () => {
    const simpleJobInstance = await JobInterviewContract.deployed();

    // Get stored value
    const storedData = await simpleJobInstance.nextSteps.call();

    assert.equal(storedData, "Let's have a talk and meet each other. I'll love to work with you IOVLabs", "String is different.");
  });
});
