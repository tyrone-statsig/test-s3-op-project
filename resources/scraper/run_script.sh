if [[ $# -eq 0 ]] ; then
    echo 'No job name provided. Please provide a shell name at the end.'
    exit 1
fi

concurrently "ts-node --cwd src ${@}"

# Current issue in Concurrently prevents us from exit gracefully for the entire run.
# https://github.com/open-cli-tools/concurrently/issues/187
