//Basic form validation by Harsha (consulted Siddarth for a few clarifications and debugging)
function validator(){
    var check = true;
    var full_name = $("#name").val();
    var email_address = $("#email").val();
    var phone_number = $("#phone").val();
    var subject_field = $("#subject").val();
    var contact_message = $("#msg").val();
    var privacy_checked = $("#privacy").prop("checked");
    if (full_name == ""){
        check = false;
        document.getElementById("incomplete-field-name").innerHTML = "Please enter your Full Name";
    }
    if (email_address == ""){
        check = false;
        document.getElementById("incomplete-field-email").innerHTML = "Please enter your Email Address";
    }
    if (phone_number == ""){
        check = false;
        document.getElementById("incomplete-field-phone").innerHTML = "Please enter your Phone Number"
    }
    if (subject_field == "none"){
        check = false;
        document.getElementById("incomplete-field-subject").innerHTML = "Please choose a Subject"
    }
    if (contact_message.length < 10){
        check = false;
        document.getElementById("incomplete-field-msg").innerHTML = "Please enter at least 10 characters"
    }
    if (!privacy_checked){
        check = false;
        document.getElementById("privacy-check").style.color = "red";
    }
	if (check){
		alert("Thanks for submitting the form, we will get in touch with you as soon as possible 😀");
        //Nothing happens when the form is submitted, just yet. In future this can be modified to be received in the form of email
        //or any other mode, whatever is preferred.
	}
    return check;
}