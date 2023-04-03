import { atou } from "../utils";
const srcdocBase64 = `
PCFkb2N0eXBlIGh0bWw+CjxodG1sPgoJPGhlYWQ+CgkJPHN0eWxlPgoJCQlib2R5IHsKCQkJCWZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICJTZWdvZSBVSSIsIFJvYm90bywKCQkJCU94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsICJPcGVuIFNhbnMiLCAiSGVsdmV0aWNhIE5ldWUiLCBzYW5zLXNlcmlmOwoJCQl9CgkJPC9zdHlsZT4KCQk8c3R5bGUgaWQ9Il9fc2ZjLXN0eWxlcyI+PC9zdHlsZT4KCQk8c2NyaXB0PgoJCQkoKCkgPT4gewoJCQkJbGV0IHNjcmlwdEVscyA9IFtdCgoJCQkJd2luZG93LnByb2Nlc3MgPSB7IGVudjoge30gfQoJCQkJd2luZG93Ll9fbW9kdWxlc19fID0ge30KCgkJCQl3aW5kb3cuX19leHBvcnRfXyA9IChtb2QsIGtleSwgZ2V0KSA9PiB7CgkJCQkJT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZCwga2V5LCB7CgkJCQkJCWVudW1lcmFibGU6IHRydWUsCgkJCQkJCWNvbmZpZ3VyYWJsZTogdHJ1ZSwKCQkJCQkJZ2V0CgkJCQkJfSkKCQkJCX0KCgkJCQl3aW5kb3cuX19keW5hbWljX2ltcG9ydF9fID0ga2V5ID0+IHsKCQkJCQlyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5fX21vZHVsZXNfX1trZXldKQoJCQkJfQoKCQkJCWFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9tZXNzYWdlKGV2KSB7CgkJCQkJbGV0IHsgYWN0aW9uLCBjbWRfaWQgfSA9IGV2LmRhdGE7CgkJCQkJY29uc3Qgc2VuZF9tZXNzYWdlID0gKHBheWxvYWQpID0+IHBhcmVudC5wb3N0TWVzc2FnZSggeyAuLi5wYXlsb2FkIH0sIGV2Lm9yaWdpbik7CgkJCQkJY29uc3Qgc2VuZF9yZXBseSA9IChwYXlsb2FkKSA9PiBzZW5kX21lc3NhZ2UoeyAuLi5wYXlsb2FkLCBjbWRfaWQgfSk7CgkJCQkJY29uc3Qgc2VuZF9vayA9ICgpID0+IHNlbmRfcmVwbHkoeyBhY3Rpb246ICdjbWRfb2snIH0pOwoJCQkJCWNvbnN0IHNlbmRfZXJyb3IgPSAobWVzc2FnZSwgc3RhY2spID0+IHNlbmRfcmVwbHkoeyBhY3Rpb246ICdjbWRfZXJyb3InLCBtZXNzYWdlLCBzdGFjayB9KTsKCgkJCQkJaWYgKGFjdGlvbiA9PT0gJ2V2YWwnKSB7CgkJCQkJCXRyeSB7CgkJCQkJCQlpZiAoc2NyaXB0RWxzLmxlbmd0aCkgewoJCQkJCQkJCXNjcmlwdEVscy5mb3JFYWNoKGVsID0+IHsKCQkJCQkJCQkJZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChlbCkKCQkJCQkJCQl9KQoJCQkJCQkJCXNjcmlwdEVscy5sZW5ndGggPSAwCgkJCQkJCQl9CgoJCQkJCQkJbGV0IHsgc2NyaXB0OiBzY3JpcHRzIH0gPSBldi5kYXRhLmFyZ3MKCQkJCQkJCWlmICh0eXBlb2Ygc2NyaXB0cyA9PT0gJ3N0cmluZycpIHNjcmlwdHMgPSBbc2NyaXB0c10KCgkJCQkJCQlmb3IgKGNvbnN0IHNjcmlwdCBvZiBzY3JpcHRzKSB7CgkJCQkJCQkJY29uc3Qgc2NyaXB0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKQoJCQkJCQkJCXNjcmlwdEVsLnNldEF0dHJpYnV0ZSgndHlwZScsICdtb2R1bGUnKQoJCQkJCQkJCS8vIHNlbmQgb2sgaW4gdGhlIG1vZHVsZSBzY3JpcHQgdG8gZW5zdXJlIHNlcXVlbnRpYWwgZXZhbHVhdGlvbgoJCQkJCQkJCS8vIG9mIG11bHRpcGxlIHByb3h5LmV2YWwoKSBjYWxscwoJCQkJCQkJCWNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewoJCQkJCQkJCQl3aW5kb3cuX19uZXh0X18gPSByZXNvbHZlCgkJCQkJCQkJfSkKCQkJCQkJCQlzY3JpcHRFbC5pbm5lckhUTUwgPSBzY3JpcHQgKyBgXG53aW5kb3cuX19uZXh0X18oKWAKCQkJCQkJCQlkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEVsKQoJCQkJCQkJCXNjcmlwdEVsLm9uZXJyb3IgPSBlcnIgPT4gc2VuZF9lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKQoJCQkJCQkJCXNjcmlwdEVscy5wdXNoKHNjcmlwdEVsKQoJCQkJCQkJCWF3YWl0IGRvbmUKCQkJCQkJCX0KCQkJCQkJCXNlbmRfb2soKQoJCQkJCQl9IGNhdGNoIChlKSB7CgkJCQkJCQlzZW5kX2Vycm9yKGUubWVzc2FnZSwgZS5zdGFjayk7CgkJCQkJCX0KCQkJCQl9CgoJCQkJCWlmIChhY3Rpb24gPT09ICdjYXRjaF9jbGlja3MnKSB7CgkJCQkJCXRyeSB7CgkJCQkJCQljb25zdCB0b3Bfb3JpZ2luID0gZXYub3JpZ2luOwoJCQkJCQkJZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHsKCQkJCQkJCQlpZiAoZXZlbnQud2hpY2ggIT09IDEpIHJldHVybjsKCQkJCQkJCQlpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSByZXR1cm47CgkJCQkJCQkJaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjsKCgkJCQkJCQkJLy8gZW5zdXJlIHRhcmdldCBpcyBhIGxpbmsKCQkJCQkJCQlsZXQgZWwgPSBldmVudC50YXJnZXQ7CgkJCQkJCQkJd2hpbGUgKGVsICYmIGVsLm5vZGVOYW1lICE9PSAnQScpIGVsID0gZWwucGFyZW50Tm9kZTsKCQkJCQkJCQlpZiAoIWVsIHx8IGVsLm5vZGVOYW1lICE9PSAnQScpIHJldHVybjsKCgkJCQkJCQkJaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnIHx8IGVsLnRhcmdldCkgcmV0dXJuOwoKCQkJCQkJCQlldmVudC5wcmV2ZW50RGVmYXVsdCgpOwoKCQkJCQkJCQlpZiAoZWwuaHJlZi5zdGFydHNXaXRoKHRvcF9vcmlnaW4pKSB7CgkJCQkJCQkJCWNvbnN0IHVybCA9IG5ldyBVUkwoZWwuaHJlZik7CgkJCQkJCQkJCWlmICh1cmwuaGFzaFswXSA9PT0gJyMnKSB7CgkJCQkJCQkJCQl3aW5kb3cubG9jYXRpb24uaGFzaCA9IHVybC5oYXNoOwoJCQkJCQkJCQkJcmV0dXJuOwoJCQkJCQkJCQl9CgkJCQkJCQkJfQoKCQkJCQkJCQl3aW5kb3cub3BlbihlbC5ocmVmLCAnX2JsYW5rJyk7CgkJCQkJCQl9KTsKCQkJCQkJCXNlbmRfb2soKTsKCQkJCQkJfSBjYXRjaChlKSB7CgkJCQkJCQlzZW5kX2Vycm9yKGUubWVzc2FnZSwgZS5zdGFjayk7CgkJCQkJCX0KCQkJCQl9CgkJCQl9CgoJCQkJd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVfbWVzc2FnZSwgZmFsc2UpOwoKCQkJCXdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24gKG1zZywgdXJsLCBsaW5lTm8sIGNvbHVtbk5vLCBlcnJvcikgewoJCQkJCS8vIGlnbm9yZSBlcnJvcnMgZnJvbSBpbXBvcnQgbWFwIHBvbHlmaWxsIC0gdGhlc2UgYXJlIG5lY2Vzc2FyeSBmb3IKCQkJCQkvLyBpdCB0byBkZXRlY3QgYnJvd3NlciBzdXBwb3J0CgkJCQkJaWYgKG1zZy5pbmNsdWRlcygnbW9kdWxlIHNwZWNpZmllciDigJx2dWXigJ0nKSkgewoJCQkJCQkvLyBmaXJlZm94IG9ubHkgZXJyb3IsIGlnbm9yZQoJCQkJCQlyZXR1cm4gZmFsc2UKCQkJCQl9CgkJCQkJaWYgKG1zZy5pbmNsdWRlcygnTW9kdWxlIHNwZWNpZmllciwgXCd2dWUnKSkgewoJCQkJCQkvLyBTYWZhcmkgb25seQoJCQkJCQlyZXR1cm4gZmFsc2UKCQkJCQl9CgkJCQkJdHJ5IHsKCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAnZXJyb3InLCB2YWx1ZTogZXJyb3IgfSwgJyonKTsKCQkJCQl9IGNhdGNoIChlKSB7CgkJCQkJCXBhcmVudC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2Vycm9yJywgdmFsdWU6IG1zZyB9LCAnKicpOwoJCQkJCX0KCQkJCX0KCgkJCQl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigidW5oYW5kbGVkcmVqZWN0aW9uIiwgZXZlbnQgPT4gewoJCQkJCWlmIChldmVudC5yZWFzb24ubWVzc2FnZS5pbmNsdWRlcygnQ3Jvc3Mtb3JpZ2luJykpIHsKCQkJCQkJZXZlbnQucHJldmVudERlZmF1bHQoKQoJCQkJCQlyZXR1cm4KCQkJCQl9CgkJCQkJdHJ5IHsKCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAndW5oYW5kbGVkcmVqZWN0aW9uJywgdmFsdWU6IGV2ZW50LnJlYXNvbiB9LCAnKicpOwoJCQkJCX0gY2F0Y2ggKGUpIHsKCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAndW5oYW5kbGVkcmVqZWN0aW9uJywgdmFsdWU6IGV2ZW50LnJlYXNvbi5tZXNzYWdlIH0sICcqJyk7CgkJCQkJfQoJCQkJfSk7CgoJCQkJbGV0IHByZXZpb3VzID0geyBsZXZlbDogbnVsbCwgYXJnczogbnVsbCB9OwoKCQkJCVsnY2xlYXInLCAnbG9nJywgJ2luZm8nLCAnZGlyJywgJ3dhcm4nLCAnZXJyb3InLCAndGFibGUnXS5mb3JFYWNoKChsZXZlbCkgPT4gewoJCQkJCWNvbnN0IG9yaWdpbmFsID0gY29uc29sZVtsZXZlbF07CgkJCQkJY29uc29sZVtsZXZlbF0gPSAoLi4uYXJncykgPT4gewoJCQkJCQljb25zdCBtc2cgPSBTdHJpbmcoYXJnc1swXSkKCQkJCQkJaWYgKAoJCQkJCQkJbXNnLmluY2x1ZGVzKCdZb3UgYXJlIHJ1bm5pbmcgYSBkZXZlbG9wbWVudCBidWlsZCBvZiBWdWUnKSB8fAoJCQkJCQkJbXNnLmluY2x1ZGVzKCdZb3UgYXJlIHJ1bm5pbmcgdGhlIGVzbS1idW5kbGVyIGJ1aWxkIG9mIFZ1ZScpCgkJCQkJCSkgewoJCQkJCQkJcmV0dXJuCgkJCQkJCX0KCQkJCQkJY29uc3Qgc3RyaW5naWZpZWRBcmdzID0gc3RyaW5naWZ5KGFyZ3MpOwoJCQkJCQlpZiAoCgkJCQkJCQlwcmV2aW91cy5sZXZlbCA9PT0gbGV2ZWwgJiYKCQkJCQkJCXByZXZpb3VzLmFyZ3MgJiYKCQkJCQkJCXByZXZpb3VzLmFyZ3MgPT09IHN0cmluZ2lmaWVkQXJncwoJCQkJCQkpIHsKCQkJCQkJCXBhcmVudC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2NvbnNvbGUnLCBsZXZlbCwgZHVwbGljYXRlOiB0cnVlIH0sICcqJyk7CgkJCQkJCX0gZWxzZSB7CgkJCQkJCQlwcmV2aW91cyA9IHsgbGV2ZWwsIGFyZ3M6IHN0cmluZ2lmaWVkQXJncyB9OwoKCQkJCQkJCXRyeSB7CgkJCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAnY29uc29sZScsIGxldmVsLCBhcmdzIH0sICcqJyk7CgkJCQkJCQl9IGNhdGNoIChlcnIpIHsKCQkJCQkJCQlwYXJlbnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdjb25zb2xlJywgbGV2ZWwsIGFyZ3M6IGFyZ3MubWFwKGEgPT4gewoJCQkJCQkJCQlyZXR1cm4gYSBpbnN0YW5jZW9mIEVycm9yID8gYS5tZXNzYWdlIDogU3RyaW5nKGEpCgkJCQkJCQkJfSkgfSwgJyonKTsKCQkJCQkJCX0KCQkJCQkJfQoKCQkJCQkJb3JpZ2luYWwoLi4uYXJncyk7CgkJCQkJfQoJCQkJfSk7CgoJCQkJWwoJCQkJCXsgbWV0aG9kOiAnZ3JvdXAnLCBhY3Rpb246ICdjb25zb2xlX2dyb3VwJyB9LAoJCQkJCXsgbWV0aG9kOiAnZ3JvdXBFbmQnLCBhY3Rpb246ICdjb25zb2xlX2dyb3VwX2VuZCcgfSwKCQkJCQl7IG1ldGhvZDogJ2dyb3VwQ29sbGFwc2VkJywgYWN0aW9uOiAnY29uc29sZV9ncm91cF9jb2xsYXBzZWQnIH0sCgkJCQldLmZvckVhY2goKGdyb3VwX2FjdGlvbikgPT4gewoJCQkJCWNvbnN0IG9yaWdpbmFsID0gY29uc29sZVtncm91cF9hY3Rpb24ubWV0aG9kXTsKCQkJCQljb25zb2xlW2dyb3VwX2FjdGlvbi5tZXRob2RdID0gKGxhYmVsKSA9PiB7CgkJCQkJCXBhcmVudC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogZ3JvdXBfYWN0aW9uLmFjdGlvbiwgbGFiZWwgfSwgJyonKTsKCgkJCQkJCW9yaWdpbmFsKGxhYmVsKTsKCQkJCQl9OwoJCQkJfSk7CgoJCQkJY29uc3QgdGltZXJzID0gbmV3IE1hcCgpOwoJCQkJY29uc3Qgb3JpZ2luYWxfdGltZSA9IGNvbnNvbGUudGltZTsKCQkJCWNvbnN0IG9yaWdpbmFsX3RpbWVsb2cgPSBjb25zb2xlLnRpbWVMb2c7CgkJCQljb25zdCBvcmlnaW5hbF90aW1lZW5kID0gY29uc29sZS50aW1lRW5kOwoKCQkJCWNvbnNvbGUudGltZSA9IChsYWJlbCA9ICdkZWZhdWx0JykgPT4gewoJCQkJCW9yaWdpbmFsX3RpbWUobGFiZWwpOwoJCQkJCXRpbWVycy5zZXQobGFiZWwsIHBlcmZvcm1hbmNlLm5vdygpKTsKCQkJCX0KCQkJCWNvbnNvbGUudGltZUxvZyA9IChsYWJlbCA9ICdkZWZhdWx0JykgPT4gewoJCQkJCW9yaWdpbmFsX3RpbWVsb2cobGFiZWwpOwoJCQkJCWNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpOwoJCQkJCWlmICh0aW1lcnMuaGFzKGxhYmVsKSkgewoJCQkJCQlwYXJlbnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdjb25zb2xlJywgbGV2ZWw6ICdzeXN0ZW0tbG9nJywgYXJnczogW2Ake2xhYmVsfTogJHtub3cgLSB0aW1lcnMuZ2V0KGxhYmVsKX1tc2BdIH0sICcqJyk7CgkJCQkJfSBlbHNlIHsKCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAnY29uc29sZScsIGxldmVsOiAnc3lzdGVtLXdhcm4nLCBhcmdzOiBbYFRpbWVyICcke2xhYmVsfScgZG9lcyBub3QgZXhpc3RgXSB9LCAnKicpOwoJCQkJCX0KCQkJCX0KCQkJCWNvbnNvbGUudGltZUVuZCA9IChsYWJlbCA9ICdkZWZhdWx0JykgPT4gewoJCQkJCW9yaWdpbmFsX3RpbWVlbmQobGFiZWwpOwoJCQkJCWNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpOwoJCQkJCWlmICh0aW1lcnMuaGFzKGxhYmVsKSkgewoJCQkJCQlwYXJlbnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdjb25zb2xlJywgbGV2ZWw6ICdzeXN0ZW0tbG9nJywgYXJnczogW2Ake2xhYmVsfTogJHtub3cgLSB0aW1lcnMuZ2V0KGxhYmVsKX1tc2BdIH0sICcqJyk7CgkJCQkJfSBlbHNlIHsKCQkJCQkJcGFyZW50LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiAnY29uc29sZScsIGxldmVsOiAnc3lzdGVtLXdhcm4nLCBhcmdzOiBbYFRpbWVyICcke2xhYmVsfScgZG9lcyBub3QgZXhpc3RgXSB9LCAnKicpOwoJCQkJCX0KCQkJCQl0aW1lcnMuZGVsZXRlKGxhYmVsKTsKCQkJCX07CgoJCQkJY29uc3Qgb3JpZ2luYWxfYXNzZXJ0ID0gY29uc29sZS5hc3NlcnQ7CgkJCQljb25zb2xlLmFzc2VydCA9IChjb25kaXRpb24sIC4uLmFyZ3MpID0+IHsKCQkJCQlpZiAoY29uZGl0aW9uKSB7CgkJCQkJCWNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7CgkJCQkJCXBhcmVudC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2NvbnNvbGUnLCBsZXZlbDogJ2Fzc2VydCcsIGFyZ3MsIHN0YWNrIH0sICcqJyk7CgkJCQkJfQoJCQkJCW9yaWdpbmFsX2Fzc2VydChjb25kaXRpb24sIC4uLmFyZ3MpOwoJCQkJfTsKCgkJCQljb25zdCBjb3VudGVyID0gbmV3IE1hcCgpOwoJCQkJY29uc3Qgb3JpZ2luYWxfY291bnQgPSBjb25zb2xlLmNvdW50OwoJCQkJY29uc3Qgb3JpZ2luYWxfY291bnRyZXNldCA9IGNvbnNvbGUuY291bnRSZXNldDsKCgkJCQljb25zb2xlLmNvdW50ID0gKGxhYmVsID0gJ2RlZmF1bHQnKSA9PiB7CgkJCQkJY291bnRlci5zZXQobGFiZWwsIChjb3VudGVyLmdldChsYWJlbCkgfHwgMCkgKyAxKTsKCQkJCQlwYXJlbnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdjb25zb2xlJywgbGV2ZWw6ICdzeXN0ZW0tbG9nJywgYXJnczogYCR7bGFiZWx9OiAke2NvdW50ZXIuZ2V0KGxhYmVsKX1gIH0sICcqJyk7CgkJCQkJb3JpZ2luYWxfY291bnQobGFiZWwpOwoJCQkJfTsKCgkJCQljb25zb2xlLmNvdW50UmVzZXQgPSAobGFiZWwgPSAnZGVmYXVsdCcpID0+IHsKCQkJCQlpZiAoY291bnRlci5oYXMobGFiZWwpKSB7CgkJCQkJCWNvdW50ZXIuc2V0KGxhYmVsLCAwKTsKCQkJCQl9IGVsc2UgewoJCQkJCQlwYXJlbnQucG9zdE1lc3NhZ2UoeyBhY3Rpb246ICdjb25zb2xlJywgbGV2ZWw6ICdzeXN0ZW0td2FybicsIGFyZ3M6IGBDb3VudCBmb3IgJyR7bGFiZWx9JyBkb2VzIG5vdCBleGlzdGAgfSwgJyonKTsKCQkJCQl9CgkJCQkJb3JpZ2luYWxfY291bnRyZXNldChsYWJlbCk7CgkJCQl9OwoKCQkJCWNvbnN0IG9yaWdpbmFsX3RyYWNlID0gY29uc29sZS50cmFjZTsKCgkJCQljb25zb2xlLnRyYWNlID0gKC4uLmFyZ3MpID0+IHsKCQkJCQljb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrOwoJCQkJCXBhcmVudC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2NvbnNvbGUnLCBsZXZlbDogJ3RyYWNlJywgYXJncywgc3RhY2sgfSwgJyonKTsKCQkJCQlvcmlnaW5hbF90cmFjZSguLi5hcmdzKTsKCQkJCX07CgoJCQkJZnVuY3Rpb24gc3RyaW5naWZ5KGFyZ3MpIHsKCQkJCQl0cnkgewoJCQkJCQlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJncyk7CgkJCQkJfSBjYXRjaCAoZXJyb3IpIHsKCQkJCQkJcmV0dXJuIG51bGw7CgkJCQkJfQoJCQkJfQoJCQl9KSgpCgkJPC9zY3JpcHQ+CgoJCTwhLS0gRVMgTW9kdWxlIFNoaW1zOiBJbXBvcnQgbWFwcyBwb2x5ZmlsbCBmb3IgbW9kdWxlcyBicm93c2VycyB3aXRob3V0IGltcG9ydCBtYXBzIHN1cHBvcnQgKGFsbCBleGNlcHQgQ2hyb21lIDg5KykgLS0+CgkJPHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vdW5wa2cuY29tL2VzLW1vZHVsZS1zaGltc0AxLjUuMTgvZGlzdC9lcy1tb2R1bGUtc2hpbXMud2FzbS5qcyI+PC9zY3JpcHQ+CgkJPHNjcmlwdCB0eXBlPSJpbXBvcnRtYXAiPjwhLS1JTVBPUlRfTUFQLS0+PC9zY3JpcHQ+Cgk8L2hlYWQ+Cgk8Ym9keT48L2JvZHk+CjwvaHRtbD4K`;

export const srcdoc = atou(srcdocBase64);