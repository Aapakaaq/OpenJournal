using Core;
using NUnit.Framework;

namespace CoreTest.Services;

[TestFixture]
public class NewtonsoftValidatorTest
{
  private NewtonsoftValidator _sut;

  [SetUp]
  public void Setup()
  {
    _sut = new NewtonsoftValidator();
  }

  [Test]
  public void IsValid_ValidJsonString_ShouldReturnTrue()
  {
    // Arrange
    int numberOfFields = 5;
    string validJson = HelperFunctions.GenerateRandomJsonString(numberOfFields);

    // Act
    bool result = _sut.IsValid(validJson);

    // Assert
    Assert.IsTrue(result);
  }

  [Test]
  public void IsValid_InvalidJsonString_ShouldReturnFalse()
  {
    // Arrange
    string invalidJson = "{\"foo\" : bar}";

    // Act
    bool result = _sut.IsValid(invalidJson);

    // Assert
    Assert.IsFalse(result);
  }
}
