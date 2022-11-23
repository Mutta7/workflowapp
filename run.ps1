using namespace System.Net

# Input bindings are passed in via param block.
param( $Request, $TriggerMetadata)

# Write to the Azure Functions log stream.
Write-Host  "PowerShell HTTP trigger function processed a request."

# Interact with query parameters or the body of the request.
$Request_Array = $Request.Body.Split("&")
$Request_Hash = @{};
foreach($line in $Request_Array){
    $line =  [System.Web.HttpUtility]::UrlDecode(($line), [System.Text.Encoding]::UTF8)
   $line_split = ($line.Split("="))
   $Request_Hash.($line_split[0]) = $line_split[1]
}

$Response_Hash    = [PSObject]@{
   PartitionKey = $Request_Hash.field2
   RowKey = get-date -Format  "yyyy-MM-dd HH:mm:ss.ms"
   name = $Request_Hash.field1
   email = $Request_Hash.field2
   telephone = ($Request_Hash.tel_no_1 + "-"+$Request_Hash.tel_no_2 + "-"+$Request_Hash.tel_no_3)
   category = $Request_Hash.field4
   inquiry = $Request_Hash.field5
}

# Associate values to output bindings by calling 'Push-OutputBinding'.
 Push-OutputBinding -Name Response -Value ([HttpResponseContext] @{
   headers    = @{ 'content-type' = 'text/json' }
   StatusCode = [HttpStatusCode]::OK
   Body = $Response_Hash | ConvertTo-Json
})

Push-OutputBinding -Name documentscontainer -Value ($Response_Hash | ConvertTo-Json)