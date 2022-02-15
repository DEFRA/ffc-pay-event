# ffc-pay-event
Event processing for FFC Pay

> An [Azure Function app](https://azure.microsoft.com/en-gb/services/functions/)
> for consuming events from the payment services

## Function Development

The best place to start for an overall view of how JavaScript Functions work in
Azure is the
[Azure Functions JavaScript developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2).
From there follow the appropriate link to the documentation specific to
your preferred development environment i.e.
[Visual Studio Code](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node)
or
[command line](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser).

The documentation within this repo assumes the `command line` setup has been
completed, specifically for
[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Running Locally

To start the function app run `func start` or `npm run start` (which just runs
`func start`).

## Configuration - Application Settings

Currently the deployment of application settings is manual and can be editted in either the Azure portal or via the Azure CLI

### Example

Through the Azure CLI app settings can be set via the use of a json file

settings.json

```
[
  {
    "name": "AZURE_STORAGE_USE_CONNECTION_STRING",
    "value": ""
  }
]
```

azure CLI command

```
az login

az functionapp config appsettings set --name "$FUNCTION_APP_NAME" --resource-group "$RESOURCE_GROUP" --settings @settings.json
```

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT
LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and
applications when using this information.

> Contains public sector information licensed under the Open Government license
> v3